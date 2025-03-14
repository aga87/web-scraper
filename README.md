# Web Scraping using Selenium with Headless Chrome

## Tech Stack

- Node.js
- Typescript
- **Selenium WebDriver** is a library that provides APIs to interact with web browsers (like Chrome, Firefox, etc.) for automating web tasks like crawling, scraping, and testing. It allows you to control browsers programmatically, simulate user actions (like clicks and form submissions), and extract data from pages. It supports multiple browsers, and you can configure it to work with Chrome via **chromedriver**. - [selenium-webdriver on npm](https://www.npmjs.com/package/selenium-webdriver)

- **ChromeDriver** is a standalone server that implements the WebDriver protocol for Chromium-based browsers (like Chrome). It is used by Selenium to control Chrome in both headless and non-headless modes. It acts as the bridge between Selenium and Chrome, executing commands on the browser.  - [chromedriver on npm](https://www.npmjs.com/package/chromedriver)

## Branches

- `main` - Production branch. This branch represents the stable and production-ready version of the code. It is used for deployments to the live environment.

- `dev` - Development branch. This is the default branch for ongoing development work. It is where new features and bug fixes are implemented and tested before being merged into the main branch.