import { Builder, WebDriver } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

/**
 * A WebDriver factory: a stateless service that creates and configures new WebDriver instances on demand.
 * This service does not manage navigation or lifecycle; callers are responsible for using and quitting the driver.
 *
 * Usage:
 *
 * const driver = await webDriverService.createDriver(true);
 *
 * try {
 *   await driver.get("https://example.com");
 *   // scrape
 * } finally {
 *   await driver.quit();
 * }
 *
 */
export class WebDriverService {
  public async createDriver(isHeadless = true): Promise<WebDriver> {
    const options = new chrome.Options();

    options.addArguments(
      "--no-sandbox", // Disable Chrome sandbox (needed in some CI/Linux containers; usually unnecessary on macOS)
      "--disable-dev-shm-usage", // Avoid /dev/shm shared memory issues (prevents crashes in containers)
      "--disable-gpu", // Disable GPU acceleration (improves stability in headless mode)
      "--disable-extensions", // Prevent loading browser extensions (reduces variability)
      "--disable-translate", // Disable built-in Google Translate UI prompts
      "--window-size=1280,800", // Set deterministic viewport size for consistent rendering/layout
      "--incognito", // Start session in private mode (no cached data, cookies, or extensions)

      // Disable background services/features to reduce resource usage and unexpected behavior
      "--disable-background-networking", // Stop background network requests (metrics, updates, etc.)
      "--disable-renderer-backgrounding", // Prevent Chrome from throttling background tabs
      "--disable-background-timer-throttling", // Prevent throttling of JS timers in background
      "--disable-features=Translate,BackForwardCache", // Disable specific features that can interfere with navigation/session stability
      "--no-first-run", // Skip first-run setup tasks
      "--no-default-browser-check", // Prevent Chrome from checking if it’s the default browser
    );

    if (isHeadless) {
      options.addArguments("--headless=new");
    }

    options.setPageLoadStrategy("eager");

    return new Builder().forBrowser("chrome").setChromeOptions(options).build();
  }
}
