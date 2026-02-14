import {
  MdnDocsScraperService,
  WebDriverService,
  WebScraperService,
} from "../services";

const webDriverService = new WebDriverService();
const webScraperService = new WebScraperService(webDriverService);

export const mdnDocsScraperService = new MdnDocsScraperService(
  webScraperService,
);
