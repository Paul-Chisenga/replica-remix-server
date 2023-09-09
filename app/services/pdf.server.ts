import puppeteer from "puppeteer";

/**
 * PDF Export with puppeteer
 */
export async function createPdf(content: string) {
  // Create a browser instance
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox"],
  });
  // Create a new page
  const page = await browser.newPage();
  const conetnt = await page.setContent(
    `
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
            .hidden {
                display: none;
            }
            </style>
            <title>Income Statement</title>
            
        </head>
        <body>
        ${content}
        </body>
    </html>
    `,
    {
      waitUntil: "domcontentloaded",
    }
  );

  await page.emulateMediaType("screen");
  //Generate pdf into a directory
  const fileBuffer = await page.content();
  await browser.close();

  return fileBuffer;
}
