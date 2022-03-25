if (process.env.NODE_ENV !== 'production' ){
    require('dotenv').config()
}
const express = require("express");
var path = require ('path');
//const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/userProfile";
const server = express();
const bp = require("body-parser");
const expressLayouts= require("express-ejs-layouts")
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db =mongoose.connection
db.on ('error', error=> console.error(error))
db.once ('open', ()=> console.log (`connected to mongodb`))

server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'))
server.set('layout', 'layouts/layout')


server.use(express.static("public"));
server.use(bp.urlencoded({ extended:false}));
server.use(bp.json());
server.use(expressLayouts)


//mongo database connections
/*MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
});
*/
//qr generator
const qr = require("qrcode");

const qrFilesRouter = require('./routes/qrFiles')
const indexRouter = require('./routes/index')

server.use('/', qrFilesRouter)
server.use('/', indexRouter)

server.listen(3000);