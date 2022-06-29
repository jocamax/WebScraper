import showOglasi from './js/showOglasi.js'
import showOglasiStartit from './js/showOglasiStartit.js'
const url = './theData.json'
const url2 = './theDataStartit.json'

window.addEventListener('DOMContentLoaded',()=>{
    showOglasi(url)
    showOglasiStartit(url2)
})