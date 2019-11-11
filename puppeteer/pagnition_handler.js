 const puppeteer = require('puppeteer');
 async function run(pageToScrape){
    return await new Promise(async (resolve, reject) => {
      try {

      if(!pageToScrape) {
        pageToScrape = 1;

      }
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://news.ycombinator.com/');
      let currentPage = 1;
      let urls = [];
      while(currentPage <= pageToScrape) {
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
      if(currentPage < pageToScrape){
        await Promise.all([
          page.click('a.morelink'),
          page.waitForSelector('a.storylink'),
        ])
      }
    ++currentPage;
    await page.screenshot({path: `${currentPage}screenshot.png`});
      }
      browser.close();
      return resolve(urls);
    } catch (err) {
            reject(err);
            browser.close();
    }
   });
 }
run(5).then(console.log).catch(console.error);
