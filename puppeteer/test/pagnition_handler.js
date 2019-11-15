 const puppeteer = require('puppeteer');
 async function run(pagesToScrape){
    return await new Promise(async (resolve, reject) => {
      try {

      if(!pagesToScrape) {
        pagesToScrape = 1;

      }
      const browser = await puppeteer.launch({
        headless: false,
        timeout: 15000,
        // env: {
        //
        // }
        userDataDir: './data'
        // performance boasting as cookies and caches are saved rather than redownloading through chrome
      });
      const page = await browser.newPage();
      await page.goto('https://news.ycombinator.com/');
      let currentPage = 1;
      let urls = [];
      while(currentPage <= pagesToScrape) {
        let newUrls = await page.evaluate(()=> {
          let results = [];
          let items = document.querySelectorAll('a.storylink');
          items.forEach((item)=>{
            results.push({
                url: item.getAttribute('href'),
                text: item.innerText,
            });
          });
          return results;
      });
      urls = urls.concat(newUrls);
      if(currentPage < pagesToScrape){
        await Promise.all([
          page.click('a.morelink'),
          page.waitForSelector('a.storylink'),
        ])
      }
    ++currentPage;
    await page.screenshot({path: `test/screenshots/${currentPage}screenshot.png`});
      }
      browser.close();
      return resolve(urls);
    } catch (err) {
        if(err instanceof puppeteer.errors.TimeoutError){
          console.error(err);
        }
            reject(err);
            browser.close();
    }
   });
 }
run(5).then(console.log).catch(console.error);
