const puppeteer = require('puppeteer');
function run () {
  return new Promise(async (resolve, reject) =>{
    try{
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://news.ycombinator.com/');
      let urls = await page.evaluate(() => {
        //evaluate lets us run javascript code. everything returned gets resolved by promise
        let results = [];
        let items = document.querySelectorAll('a.storylink');
        items.forEach((item) => {
          results.push({
            url: item.getAttribute('href'),
            text: item.innerText
          });
        });
        return results
      })
      browser.close();
      return resolve(urls);
    } catch(err) {
      browser.close();
      return reject(err);
    }
  })
}
run()
  .then(console.log)
  .catch(console.error);
