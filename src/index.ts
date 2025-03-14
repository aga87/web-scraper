import "dotenv/config";
import { debugLog } from "./startup/debug";
import { webScraperService } from "./startup/services";

(async () => {
  try {
    await webScraperService.scrapePage("https://developer.mozilla.org");
  } catch (err: unknown) {
    debugLog(`Error: ${String(err)}`);
  }
})();
