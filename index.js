const fs = require("fs");
const ENV = require("./env.json");
const puppeteer = require("puppeteer-core");
const express = require("express");
const app = express();
const PORT = ENV.port || 3000;

let executablePath = "C:/Program Files/Google/Chrome/Application/chrome.exe";
if (!fs.existsSync(executablePath)) {
  executablePath = ENV.executable_path;
}

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.all("/", async (req, res) => {
  res.json({ message: "Hello World!" });
});

const doDownload = async (req, res) => {
  const { path } = req.params;

  const data = {};

  Object.keys(req.query).forEach((key) => {
    data[key] = req.query[key];
  });
  Object.keys(req.body).forEach((key) => {
    data[key] = req.body[key];
  });

  const result = await generate(path, data);

  res.json(result);
};

app.all("/path/:path", doDownload);

let browser = null;
const openBrowser = async () => {
  try {
    browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null,
      args: [
        "--window-position=0,0",
        "--no-sandbox",
        "--disable-setuid-sandbox",
      ],
      executablePath,
    });
  } catch (error) {
    console.log(error);
  }
};

const generate = async (path, data) => {
  try {
    const query = Object.keys(data)
      .map((key) => `${key}=${data[key]}`)
      .join("&");

    const page = await browser.newPage();

    const url = `${ENV.base_url}/${path}?${query}`;

    await page.goto(url, {
      waitUntil: "networkidle2",
    });

    const download = await page.$("#create");
    await download.click();

    let linkElement = await page.$("#link");
    let link = await page.evaluate((anchor) => {
      const href = anchor.getAttribute("href") || "";
      if (!href.startsWith("/")) return href;
      const url = new URL(href, window.location.origin);
      return url.href;
    }, linkElement);

    while (!link) {
      linkElement = await page.$("#link");
      link = await page.evaluate((anchor) => {
        const href = anchor.getAttribute("href") || "";
        if (!href.startsWith("/")) return href;
        const url = new URL(href, window.location.origin);
        return url.href;
      }, linkElement);
    }

    await page.close();

    return Promise.resolve({
      success: true,
      link,
      msg: "Download link generated",
    });
  } catch (error) {
    // console.error(error);
    return Promise.resolve({ msg: error.message, success: false });
  }
};

(async () => {
  await openBrowser();

  app.listen(PORT, () => {
    console.log("running at http://localhost:" + PORT);
  });
})();
