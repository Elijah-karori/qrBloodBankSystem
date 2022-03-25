const express=require('express')
const router =express.Router()
//qr generator
const qr = require("qrcode");

//all collection


router.post("/scan", (req, res) => {
    const url = req.body.url;
    const json =[]
console.log(url);
    if(url.length === 0) {res.send("empty Data");}

    qr.toDataURL(url,(err, src) => {
        if(err) res.send("Error Occured");

        res.render('scan', { src });
    });
});
router.get("/new_form", (req,res)=>{
    res.render('new_form')
})

module.exports =router