const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
let ejstemp =fs.readFileSync(path.join(__dirname,'test.ejs'))
let template = ejs.compile(ejstemp.toString('utf8'));
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

let data = require('./statuslogs.json'); 
let i=1;
data.forEach(el => {
    el._id=i++;
    el.date= new Date(el.date.$date).toLocaleDateString('fa-IR', options)
});
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(template({data}));
  await page.pdf({ path: 'hn.pdf', format: 'a4' });
  await browser.close();
})();

