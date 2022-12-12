const express = require('express');
const cheerio = require("cheerio");
const axios  = require('axios')
const fs = require('fs')

const routers = express.Router();

routers.use(express.urlencoded())
routers.use(express.static('views'))

routers.route('').get((req,res)=>{
    res.render('index.html')
}).post(async (req,res)=>{
    const fetchTitles = async () => {
        try {
            const response = await axios.get(`https://www.flipkart.com/search?q=${req.body.word}`);

            const html = response.data;

            const $ = cheerio.load(html);

            const titles = [];

            $("#container > div > div._36fx1h._6t1WkM._3HqJxg > div._1YokD2._2GoDe3 > div:nth-child(2)").each((_idx, el) => {
                const title = $(el).html()
                titles.push(title)
            });
            return titles;

        } catch (error) {
            throw error;
        }
    };
    fetchTitles().then(async (titles) => {
        // fs.writeFileSync('./views/res_src.html',titles[0])
        // res.render('res_src.html')
        let resW = await titles[0]
        res.send( `<div id='ruf'> ` +resW.split('to Compare')+`</div> <style>
        *{} 
        img{
                margin: 0 auto;
                margin-left: 250%;
        }
        a{
            text-decoration: none;
            z-index: -10;
            background: #8b00000a;
            opacity: 1;
            margin: 0 auto;
        }
        .fMghEO ul li{
            background:gray;
            margin:0 auto;
            text-

        }
        </style>`)   
    });
})

module.exports = routers