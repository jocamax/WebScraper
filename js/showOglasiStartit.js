import fetchOglasi from './fetch.js'
import get from './getElement.js'

    const showOglasiStartit = async(url) =>{
        //fetchujemo oglase sa jobertyja
        const data = await fetchOglasi(url)
        // destructuring i za return ide div koji se nalazi u sectionu 
        const displayOglas=(data)=>{
            const section = get('.section2')
            const noviOglasi = data.map((oglas) =>{
                const {naslov, imeFirme, linkPosla} = oglas

                return `
                <div class='startitContainer'>
                <h3>${naslov}</h3>
                <p>${imeFirme}</p>
                <a href="${linkPosla}" target='_blank'>Poseti Oglas</a>
                </div>
                `
                }).join('')
                section.innerHTML = noviOglasi
                    
                return section
        }
        
           
        const section = await displayOglas(data)
    }


export default showOglasiStartit