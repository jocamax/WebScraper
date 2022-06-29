const puppeteer = require("puppeteer");
const fs = require('fs');

async function scrapeData () {
    const browser = await puppeteer.launch({
      headless: true,
      args:['--no-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://www.joberty.rs/IT-poslovi?page=1&pageSize=10&seniority=Junior&sort=created&technologies=React,ReactJS', {
      waitUntil: 'networkidle2'
    });
    

    const grabOglasi = await page.evaluate(()=>{
        const oglasi = document.querySelectorAll('.compact-job')
        
        let oglasiArr = []
        oglasi.forEach((oglasTag)=>{
          // Selecting all elements that I want from jobery
            const title = oglasTag.querySelector('h4')
            const hrefOglasa = oglasTag.querySelector('h4 > a').href
            const imeKompanije = oglasTag.querySelector(" div > div:nth-child(2) > div:nth-child(1) > a")
            const hrefKompanije = oglasTag.querySelector(" div > div:nth-child(2) > div:nth-child(1) > a").href
            // push in array 
            oglasiArr.push({
                oglas: title.innerText,
                kompanija: imeKompanije.innerText,
                hrefKompanije: hrefKompanije,
                hrefOglasa: hrefOglasa
            });
        })
        
        return oglasiArr

        
    })
    console.log(grabOglasi);
    // pisemo fajl koji cemo posle citati
    fs.writeFile("theData.json", JSON.stringify(grabOglasi), () => {
        console.log("The data saved to the file named theData.json")
      })
    await browser.close();
    return 'Done';
  };

module.export = scrapeData
