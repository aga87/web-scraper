import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

async function startScrape() {
  const options = new chrome.Options();
  options.addArguments("headless"); // Runs Chrome in headless mode
  options.addArguments("no-sandbox"); // Avoids issues in Docker containers

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    // Navigate to a webpage (you can change the URL)
    await driver.get("https://developer.mozilla.org");

    // Wait until the page loads completely (example: wait for a specific element)
    await driver.wait(until.elementLocated(By.css("h1")), 10000);

    // Extract and log the page title
    const title = await driver.getTitle();
    console.log("Page title is:", title);

    // Extract a specific element (for example, the first heading in the page)
    const heading = await driver.findElement(By.css("h1")).getText();
    console.log("Heading on the page:", heading);
  } finally {
    await driver.quit();
  }
}

// Start the crawler
startScrape().catch((err) => console.error("Error:", err));
