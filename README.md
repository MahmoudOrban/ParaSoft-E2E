# ParaSoft-E2E
Sample Demo Playwright E2E on Banking App

# ParaSoft-E2E
This repository contains end-to-end (E2E) tests for the ParaSoft application using Playwright. The following guide will help you set up and understand the project structure.

# Project Structure
>
- **/tests**: Contains the E2E test files that describe the scenarios to be tested.
- **/POM** : Contian pages classes that encapusulate interaction with Specific Page
- **playwright.config.ts**: This file contains the global configuration for Playwright, including browser settings, test directory, timeouts, etc.
- ***package.json**: Holds the metadata about the project and dependencies required to run the tests.
## Setup Instructions
 ***Prerequisites***
 ---
   Make sure you have the following installed:
---

```bash
Node.js (v12+)
npm (v6+)```

### Installation
#### Clone the repository:

```bash
Copy code
git clone https://github.com/MahmoudOrban/ParaSoft-E2E.git
cd ParaSoft-E2E```

### Install the required dependencies:

```bash
npm install
npx playwright install```
 
### Running the Tests
To execute the tests, use the following command:

```bash
npx playwright test```

This will run all tests defined in the /tests directory.

Running Specific Tests
To run a specific test file, use:

bash
Copy code
npx playwright test tests/<test-file-name>.spec.js
Configuration
To configure the test environment, modify the playwright.config.js file. Here you can specify:

Browsers to run tests on (Chromium, Firefox, WebKit)
Base URL for tests
Test retries and timeout settings
Writing Tests
Create a new test: Add a new .spec.js file in the /tests directory.
Structure: Use Playwright's built-in assertions to interact with elements on the page and verify outcomes.

Troubleshooting
If you encounter any issues, ensure all dependencies are correctly installed, and your Node.js version is up to date.
