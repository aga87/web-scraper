import { Builder, By, until, WebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import { debugLog } from "../startup/debug";

export class WebScraperService {
  private driver: WebDriver | null = null;

  // Initialize the driver at runtime
  private async getDriver(): Promise<WebDriver> {
    if (!this.driver) {
      const options = new chrome.Options();
      options.addArguments("headless"); // Runs Chrome in headless mode
      options.addArguments("no-sandbox"); // Avoids issues in Docker containers

      this.driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();
    }
    return this.driver;
  }

  public async scrapePage(
    url: string
  ): Promise<{ title: string; heading: string }> {
    const driver = await this.getDriver();

    try {
      debugLog(`Navigating to page: ${url}`);
      await driver.get(url);

      // Wait until the page loads completely (example: wait for a specific element)
      await driver.wait(until.elementLocated(By.css("h1")), 10000);

      // Extract the page title
      const title = await driver.getTitle();

      // Extract the first heading in the page
      const heading = await driver.findElement(By.css("h1")).getText();

      debugLog(
        `Successfully scraped the page title - ${title} and heading - ${heading}`
      );
      return { title, heading };
    } catch (err: unknown) {
      debugLog(`Error scraping page ${url}: ${String(err)}`);
      throw err;
    } finally {
      // Always quit the driver after scraping
      await driver.quit();
      debugLog("Driver quitted");
    }
  }
}
