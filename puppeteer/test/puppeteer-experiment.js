const puppeteer = require('puppeteer');

async () => {
  const browser = await puppeteer.launch({
//useful debugging tools
    headless: false,
    // slowsMo slows down each operation puppeteer performs
    slowMo: 200,
    devtools: true
  // Browser operations
});
  const page = await browser.newPage();



  //page coverage
  await Promise.all([
    page.coveage.startJSCoverage(), page.coverage.startCSSCoverage()
  ]);

  await page.goto('https://automated-test.elementsuitedemo.com/');

  const calculateUsedBytes = (type, coverage) =>
    coverage.map(({ url, ranges, text}) => {
      let usedBytes = 0;

      ranges.forEach(range => (usedBytes += range.end - range.start - 1));

      return {
        url,
        type,
        usedBytes,
        totalBytes: text.length
      };
    });

    console.info([
      ...calculateUsedBytes('js', jsCoverage),
      ...calculateUsedBytes('css', cssCoverage)
    ]);

//analysing load times through metrics

  // Executes Navigation API within the page context
  const metrics = await page.evaluate(() => JSON.stringify(window.performance));

  // Parses the result to JSON
  console.info(JSON.parse(metrics));
//needs to be in its own module

//analyzing runttime
// Returns runtime metrics of the page
  const runtimeMetrics = await page.metrics();
  console.info(runtimeMetrics);

  await page.setViewport({ width: 1920, height: 1080 });
  await page.focus('[es-test="example-locator"]');
  await page.keyboard.type('Keyboard', { delay: 100 });



  // Generates a PDF from the page content
  await page.pdf({ path: 'overview.pdf' });
// data.pdf(...)?

// Changes to the north pole's location
await page.setGeolocation({ latitude: 90, longitude: 0 });
// a setGeolocation for Londong, Dublin, Sweden, Austria

  await page.screenshot({
  path: `${something-unique}screenshot.jpg`,
  type: 'jpeg',
  quality: 80
  // clip: { x: 220, y: 0, width: 630, height: 360 }
});

const tweetHandle = await page.$('.tweet .retweets');
expect(await tweetHandle.evaluate(node => node.innerText)).toBe('10');

await browser.close();
}

();
