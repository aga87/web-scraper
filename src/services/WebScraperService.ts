import { WebDriver } from "selenium-webdriver";
import { debugLog } from "../startup/debug";

/**
 * Scraping workflow wrapper that manages the WebDriver lifecycle.
 *
 * This service:
 *  - Creates a WebDriver via the injected driver factory
 *  - Navigates to the given URL
 *  - Executes the provided scraping function
 *  - Ensures the driver is always quit
 *
 * Page-specific scraping logic is supplied by the caller via the callback.
 */

type DriverFactory = {
  createDriver: (headless?: boolean) => Promise<WebDriver>;
};

export class WebScraperService {
  constructor(private readonly webDriverService: DriverFactory) {}

  /**
   * Runs a scraping function on a single page
   */
  public async withPage<T>(
    url: string,
    fn: (driver: WebDriver) => Promise<T>,
    opts: { headless?: boolean } = {},
  ): Promise<T> {
    const driver = await this.webDriverService.createDriver(
      opts.headless ?? true,
    );

    try {
      debugLog(`Navigating to page: ${url}`);
      await driver.get(url);
      return await fn(driver);
    } finally {
      await driver.quit();
    }
  }
}
