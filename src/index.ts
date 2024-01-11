import puppeteer, { Page } from "puppeteer";

import checkEnvs from "./utils/checkEnvs";
import createNewFile from "./utils/createNewFile";
import getFilePath from "./utils/getFilePath";

const getTemplateContent = async (page: Page) => {
  const templatContent = await page?.$eval("#newcontent", (el) => {
    if (!el?.textContent) {
      return undefined;
    }
    return el.textContent.trim();
  });

  if (!templatContent) {
    return "";
  }
  return templatContent;
};

const startCrawling = async () => {
  const { WP_URL, WP_USER, WP_PASSWORD } = checkEnvs([
    "WP_URL",
    "WP_USER",
    "WP_PASSWORD",
  ]);

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.goto(`${WP_URL}/wp-login.php`);

  await page.type("#user_login", WP_USER);
  await page.type("#user_pass", WP_PASSWORD);
  await page.click("#wp-submit");
  await page.waitForNavigation();
  await page.goto(`${WP_URL}/wp-admin/theme-editor.php`);

  const files = await page.$$eval('li[role="treeitem"] a', (links) =>
    links.map((link) => link.getAttribute("href"))
  );

  for (const [i, file] of files.entries()) {
    if (!file) continue;
    if (i !== 0) {
      await page.goto(file);
    }

    const filePath = getFilePath(file);
    const templateContent = await getTemplateContent(page);
    createNewFile(filePath, templateContent);
  }

  await browser.close();
};

startCrawling();
