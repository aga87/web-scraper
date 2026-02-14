import "dotenv/config";
import { debugLog } from "./startup/debug";
import { mdnDocsScraperService } from "./startup/services";

async function scrapeSingleDoc() {
  try {
    const snapshot = await mdnDocsScraperService.scrapeDoc(
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    );
    debugLog("Scraping job succeeded:", snapshot);
  } catch (err: unknown) {
    debugLog("Scraping job failed:", err);
    process.exit(1);
  }
}

scrapeSingleDoc();

async function scrapeMany() {
  const urls = [
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
  ];

  try {
    const snapshots = await mdnDocsScraperService.scrapeMany(urls);

    debugLog(JSON.stringify(snapshots, null, 2));

    debugLog(`Successfully scraped ${snapshots.length} pages.`);
  } catch (err: unknown) {
    debugLog("Batch scraping job failed:", err);
    process.exit(1);
  }
}

scrapeMany();
