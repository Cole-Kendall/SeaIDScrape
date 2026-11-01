# SeaIDScrape Playwright Environment

## Before you start

You need:

- Windows 10 or newer
- Internet access
- An authorized company username and password
- Permission to access and store the employee information produced by this project

## Set up the project

1. Install [Node.js](https://nodejs.org/) for Windows. Use the LTS version.
2. Open the project folder in Visual Studio Code.
3. Open the VS Code terminal with **Terminal > New Terminal**.
4. Run these commands one at a time:

```powershell
npm install
npx playwright install firefox
```

The first command installs the project's software. The second installs the Firefox browser used by the tests.

## Add your sign-in information

Create a file named `.env` in the project folder. Add your credentials in this format:

```text
SEAPORT_USERNAME=your_username
SEAPORT_PASSWORD=your_password
```

Replace the example values with your own sign-in information. Do not share this file or commit it to GitHub. The project is configured to ignore `.env`.

## Run the scraper

In the VS Code terminal, run:

```powershell
npm run test:headed
```

Firefox will open and the test will sign in automatically. Keep the browser open until the run finishes. If sign-in prompts for multi-factor authentication, complete it in the browser.

After a successful run:

- Images are saved in `names/`
- Employee details are saved in `names/employees.csv`
- Both are ignored by Git and should not be uploaded to public repositories

## Commands

- `npm test` — run the test suite
- `npm run test:ui` — open Playwright's interactive UI
- `npm run test:headed` — run tests in a visible browser
- `npm run show-report` — open the HTML test report
- `npx playwright install firefox` — install or update Firefox

To stop a running command, press `Ctrl+C` in the terminal.

## Troubleshooting

- If PowerShell says `npm` is not recognized, close and reopen VS Code after installing Node.js, then try again.
- If the browser does not open, run `npx playwright install firefox`.
- If sign-in does not work, check that `.env` contains the correct values without quotation marks.
- If Playwright reports a missing element or page, confirm that you can access the site manually and that the page layout has not changed.
- If a run fails, inspect the HTML report:

```powershell
npm run show-report
```

## Structure

- `tests/` contains Playwright tests.
- `playwright.config.ts` contains the test configuration.
- `names/` contains scraped images and employee data.
- `test-results/` contains failed-test artifacts.
- `playwright-report/` contains the HTML report.