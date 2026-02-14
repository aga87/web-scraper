import { WebDriverService, WebScraperService } from "../services";

const webDriverService = new WebDriverService();
const webScraperService = new WebScraperService(webDriverService);
