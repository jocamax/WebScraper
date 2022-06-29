const express = require('express');
const scrapeData = require('./index');
const scrapeDataStartit= require('./indexstartit');

const app = express()

app.get('/',async (req,res)=>{
    const response = await scrapeData()
    const response2 = await scrapeDataStartit()
    res.send('Done')

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (err)=>{
    if(err) throw err;
    console.log(`Listening on port ${PORT} ... `)
});