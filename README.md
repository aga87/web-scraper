# Web Scraping using Selenium with Headless Chrome

A proof of concept demonstrating clean Selenium scraping with both single-page and session-based workflows in TypeScript.

## Branches

- `main` - Production branch. This branch represents the stable and production-ready version of the code. It is used for deployments to the live environment.

- `dev` - Development branch. This is the default branch for ongoing development work. It is where new features and bug fixes are implemented and tested before being merged into the main branch.


## Tech Stack

- Node.js
- Typescript
- **Selenium WebDriver** - Browser automation APIs for scraping and testing. [selenium-webdriver on npm](https://www.npmjs.com/package/selenium-webdriver)
- **ChromeDriver** - Implements the WebDriver protocol for Chrome.  - [chromedriver on npm](https://www.npmjs.com/package/chromedriver). 

**Important**: The ChromeDriver version must match the installed Google Chrome major version.

## Architecture Overview

- WebDriverService – Stateless driver factory responsible for creating and configuring Chrome instances.
- WebScraperService – Workflow wrapper that manages browser lifecycle (create → navigate → execute → quit).
- Domain Scrapers (e.g. MdnDocsScraperService) – Encapsulate site-specific scraping logic.
- Selenium Helpers (libs/selenium) – Reusable utilities for waits and safe text extraction.

## Features

Chrome-based web scraping (headless by default, headed supported):

- Single-page scraping
- Batch scraping using a shared browser session


## Testing in development

```shell
npm run dev

ts-node src/index.ts
```