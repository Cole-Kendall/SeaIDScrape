import { test, expect } from '@playwright/test';
import 'dotenv/config';

class Employee {
  static employees: Employee[] = [];
  name: string;
  id: string;
  position: string;

  constructor(name: string, id: string, position: string) {
    this.name = name;
    this.id = id;
    this.position = position;
  }
}


test('test', async ({ page }) => {
  await page.goto('https://id.seaworldentertainment.com');
  await page.getByRole('textbox', { name: 'Empl ID or DOMAIN\\Username' }).click();
  await page.getByRole('textbox', { name: 'Empl ID or DOMAIN\\Username' }).fill(process.env.SEAPORT_USERNAME!);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(process.env.SEAPORT_PASSWORD!);
  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page.locator('//*[@id="middle-container"]/div[2]/div[5]/figure/figcaption[1]')).toHaveText('Workday');
  await page.locator('//*[@id="middle-container"]/div[2]/div[5]/figure/a/img').click();
  await page.locator('//*[@id="root"]/div/div[2]/div/main/div/div/div/div[1]/button[2]/span').click();
  await page.waitForTimeout(5000); // Wait for 5 seconds to allow the page to load
  await expect(page.locator('//*[@id="mainContent"]/div[2]/div[3]/ol/li[2]/div/button/span')).toBeVisible();
  await page.getByText('My Org Chart').click(); 
  await page.waitForTimeout(5000); // Wait for 5 seconds to allow the page to load after clicking the button
  await page.getByText('Show More').click();
  await page.waitForTimeout(5000); // Wait for 5 seconds to allow the page to load after clicking the button
  await page.getByText('Show More').click();
  await page.waitForTimeout(5000); // Wait for 5 seconds to allow the page to load after clicking the button
  await page.getByText('Show More').click();
  const numOfPrimaryOrgChartItems = await page.locator('[data-automation-id="orgChartPrimaryProfile"]').count();
  const numOfSecondaryOrgChartItems = await page.locator('[data-automation-id="orgChartSecondaryProfile"]').count();
  console.log('Number of primary org chart items:', numOfPrimaryOrgChartItems);
  console.log('Number of secondary org chart items:', numOfSecondaryOrgChartItems);
  for (let i = 0; i < numOfPrimaryOrgChartItems; i++) {
    const primaryItem = page.locator('[data-automation-id="orgChartPrimaryProfile"]').nth(i);
    const emeloyeeImage = primaryItem.locator('img');
    const employeeImageSrc = await emeloyeeImage.getAttribute('src');
    //remove any numbers prepended to the text content
    const primaryText = (await primaryItem.textContent())?.replace(/^\d+/, '');
    const secondaryItem = page.locator('[data-automation-id="orgChartSecondaryProfile"]').nth(i);
    console.log(primaryText + ' ' + (await secondaryItem.textContent())?.split('Busch Gardens Williamsburg')[0]);
    //Paul Hart (10706941) Ride Technician, Senior
    const employee = new Employee(primaryText?.split(' (')[0] || '', primaryText?.match(/\((\d+)\)/)?.[1] || '', (await secondaryItem.textContent())?.split('Busch Gardens Williamsburg')[0] || '');
    console.log(employee);
    // Store the employee object in an array for later use
    Employee.employees.push(employee);
    // Save the employee image to a file 
    // remove "|" from the employee name for the file name
    const safeFileName = employee.name.replace(/\|/g, '');
    emeloyeeImage.screenshot({ path: `names/${safeFileName}.jpg` });
  }
  // Save the collected employees to a csv file
  const fs = require('fs');
  const csvContent = Employee.employees.map(emp => `${emp.name},${emp.id},${emp.position}`).join('\n');
  fs.writeFileSync('names/employees.csv', csvContent);
});