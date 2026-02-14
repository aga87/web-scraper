import { By, WebDriver } from "selenium-webdriver";
import { WebScraperService } from "./WebScraperService";
import {
  getAllTexts,
  getSafeTextByCss,
  waitForVisibleElByCss,
} from "../libs/selenium";

export type MdnDocSnapshot = {
  url: string;
  title: string;
  heading: string;
  summary?: string;
  sections: string[];
};

export class MdnDocsScraperService {
  constructor(private readonly scraper: WebScraperService) {}

  public async scrapeDoc(
    url: string,
    opts: { headless?: boolean } = {},
  ): Promise<MdnDocSnapshot> {
    return this.scraper.withPage(
      url,
      async (driver) => this.scrapeSnapshotFromCurrentPage(driver, url),
      { headless: opts.headless },
    );
  }

  /** Scrape snapshot assuming the driver is already on the target page.
   *  - Document title
   * - H1 heading
   * - First paragraph summary (best-effort)
   * - H2 section titles (best-effort)
   */
  private async scrapeSnapshotFromCurrentPage(
    driver: WebDriver,
    url: string,
  ): Promise<MdnDocSnapshot> {
    await waitForVisibleElByCss(driver, "main");

    const title = await driver.getTitle();
    const heading = await getSafeTextByCss(driver, "h1");

    const summary =
      (await getSafeTextByCss(driver, "main article p")) ||
      (await getSafeTextByCss(driver, "main p"));

    const sections = await getAllTexts(driver, By.css("main h2"));

    return {
      url,
      title,
      heading,
      summary: summary || undefined,
      sections,
    };
  }
}
