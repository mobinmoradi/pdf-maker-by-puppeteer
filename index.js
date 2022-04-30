const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

const pdfMaker = (data) => {
  let date = new Date()
  let ejstemp = fs.readFileSync(path.join(__dirname, 'layout.ejs'))
  let template = ejs.compile(ejstemp.toString('utf8'));

  let i = 1;
  data.forEach(el => {
    el._id = i++;
    el.date = new Date(el.date.$date).toLocaleDateString('fa-IR', options)
  });
  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(template({ data ,time:new Date().toLocaleDateString('fa-IR', options)}));
    await page.pdf({ path: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}.pdf`, format: 'a4' });
    await browser.close();
  })();
}

let data = require('./statuslogs.json');
pdfMaker(data) 

