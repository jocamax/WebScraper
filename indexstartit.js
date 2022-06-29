const puppeteer = require("puppeteer");
const fs = require('fs');

async function scrapeDataStartit () {
    const browser = await puppeteer.launch({
      headless: true,
      args:[ 
        "--incognito",
        "--no-sandbox",
        "--single-process",
        "--no-zygote"
      ]
    });
    const page = await browser.newPage();
    await page.goto('https://startit.rs/poslovi/react/',{
      waitUntil: 'networkidle2'
    });
    

    const grabOglasi = await page.evaluate(()=>{
        const oglasi = document.querySelectorAll('.mini-oglas')
        
        let oglasiArr = []
        oglasi.forEach((oglasTag)=>{
          // Selecting all elements that I want from jobery
            const title = oglasTag.querySelector('h3')
            const junior = oglasTag.querySelector('div.top-b > span')
            const linkPosla = oglasTag.querySelector('h3 > a').href
            const imeFirme = oglasTag.querySelector('h4 > a')
            // push in array 
            oglasiArr.push({
                naslov: title.innerText,
                junior: junior.innerText,
                linkPosla: linkPosla,
                imeFirme: imeFirme.innerText
            });
        })
        function samoJunior(oglas){
            if(oglas.junior.includes('J') && !oglas.naslov.includes('.Net')&& !oglas.naslov.includes('.NET') && !oglas.naslov.includes('Full Stack') && !oglas.naslov.includes('PHP')){
                return oglas
            }
        }
        var  oglasiArrFiltered = oglasiArr.filter(samoJunior)
        return oglasiArrFiltered

        
    })
    console.log(grabOglasi);
    // pisemo fajl koji cemo posle citati
    fs.writeFile("theDataStartit.json", JSON.stringify(grabOglasi), () => {
        console.log("The data saved to the file named theDataStartit.json")
      })
    await browser.close();
    return 'Done2'
  };

  module.export = scrapeDataStartit
