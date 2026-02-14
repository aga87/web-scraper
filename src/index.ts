import "dotenv/config";
import { debugLog } from "./startup/debug";
import { mdnDocsScraperService } from "./startup/services";

async function scrapeSingleDoc() {
  try {
    const snapshot = await mdnDocsScraperService.scrapeDoc(
      "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    );
    debugLog("Scraping job succeeded:", snapshot);
  } catch (err) {
    debugLog("Scraping job failed:", err);
    process.exit(1);
  }
}

scrapeSingleDoc();
