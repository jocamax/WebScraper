import fetchOglasi from './fetch.js'
import get from './getElement.js'

    const showOglasi = async(url) =>{
        //fetchujemo oglase sa jobertyja
        const data = await fetchOglasi(url)
        // destructuring i za return ide div koji se nalazi u sectionu 
        const displayOglas=(data)=>{
            const section = get('#section')
            const title = get('h1')
            const noviOglasi = data.map((oglas) =>{
                const {oglas: oglastitle, kompanija, hrefKompanije, hrefOglasa} = oglas
                console.log(kompanija);

                return `
                <div class='jobertyContainer'>
                <h2>${oglastitle}</h2>
                <a href="${hrefKompanije}" target='_blank'>${kompanija}</a>
                <a href="${hrefOglasa}" target='_blank'>Poseti Oglas</a>
                </div>
                `
                }).join('')
                section.innerHTML = noviOglasi
                    
                return section
        }
        
           
        const section = await displayOglas(data)
    }


export default showOglasi