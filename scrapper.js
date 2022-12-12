const axios = require("axios");
const cheerio = require("cheerio");

const fetchTitles = async () => {
    try {
        const response = await axios.get(`https://www.flipkart.com/search?q=nokia/phone`);

        const html = response.data;

        const $ = cheerio.load(html);

        const titles = [];
        //document.querySelector("")

        $("._1YokD2").each((_idx, el) => {
            const title = $(el).html()
            titles.push(title)
        });
        return titles;
    } catch (error) {
        throw error;
    }
};

fetchTitles().then(async(titles) => {
    console.log(titles[0]);
    // let res = await titles[0] 
    // res.split('to Compare').forEach(ele => {
    //     if (ele.includes('RAM')){
    //         console.log(ele);
    //     }
    // });;
});