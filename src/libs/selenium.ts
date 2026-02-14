import { By, until, WebDriver, WebElement } from "selenium-webdriver";

/**
 * GET TEXT HELPERS
 */

async function getSafeText(driver: WebDriver, by: By): Promise<string> {
  try {
    const el = await driver.findElement(by);
    const text = await el.getText();
    return text.trim();
  } catch {
    return "";
  }
}

export const getSafeTextByCss = (driver: WebDriver, css: string) =>
  getSafeText(driver, By.css(css));

async function getSafeElementText(el: WebElement): Promise<string> {
  try {
    return (await el.getText()).trim();
  } catch {
    return "";
  }
}

export async function getAllTexts(
  driver: WebDriver,
  by: By,
): Promise<string[]> {
  const els = await driver.findElements(by);

  const texts = await Promise.all(els.map(getSafeElementText));

  const seen = new Set<string>();
  const unique: string[] = [];

  for (const t of texts) {
    if (!t) continue;
    if (seen.has(t)) continue;
    seen.add(t);
    unique.push(t);
  }

  return unique;
}

/**
 * WAIT FOR ELEMENT HELPERS
 */

async function waitForVisibleElement(
  driver: WebDriver,
  by: By,
  timeout = 10_000,
): Promise<WebElement> {
  const el = await driver.wait(until.elementLocated(by), timeout);
  await driver.wait(until.elementIsVisible(el), timeout);
  return el;
}

export const waitForVisibleElByCss = (
  driver: WebDriver,
  css: string,
  timeout?: number,
) => waitForVisibleElement(driver, By.css(css), timeout);
