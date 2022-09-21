const express = require("express");
const mongoose  = require("mongoose");
const moment = require("moment");
var bodyParser = require('body-parser');
const fileupload =require("express-fileupload");
const _news = require("./models/news")
const _events = require("./models/events")
const events = require('./routes/event');
const news = require('./routes/news');
const user = require("./routes/user")
const cors = require("cors");
var path = require('path');

require('dotenv').config();

app = express()

// console.log(__dirname);
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(cors())

app.use(bodyParser.urlencoded({
    limit: "50mb",
    extended: false
  }));
  app.use(bodyParser.json({limit: "50mb"}));

// app.use(express.json());
// app.use(express.urlencoded({extended: false }));

// app.use(express.json())
// app.use(express.limit('50mb'));
// app.use(fileUpload({
    // limits: { fileSize: 50 * 1024 * 1024 },
//   }));
// app.use(express.urlencoded({extended:false}));
// app.use(bodyParser.json({limit: '50mb', extended: true}))

// app.use(bodyParser.json({
//     limit: '50mb'
//   }));
  
//   app.use(bodyParser.urlencoded({
//     limit: '50mb',
//     parameterLimit: 100000,
//     extended: true 
//   }));


var port = process.env.PORT||3100
var mongoDbUrl  = process.env.URIPROD; //|| "mongodb://localhost:27017/tumaini";
let options = { useNewUrlParser: true, useUnifiedTopology: true }

app.use(news)
app.use(events)
app.use(user)

app.get('/', function(req, res){  

    res.render('login', {
        title: 'View Engine Demo'
    })
})



app.get('/home', async function(req, res){  

    let data = await _news.find({}).sort([['createdAt',-1]]).limit(5);
    // console.log("news === ",data)
    res.render('home', {
        title: 'Tumainicso',
        data:data,
        moment:moment
    })
})



app.get('/event',async function(req, res){  

    let data = await _events.find({}).sort([['createdAt',-1]]).limit(20);
    // console.log("events",data)
    res.render('event', {
        title: 'tumainicso',
        data:data,
        moment:moment
    })
})

let client = mongoose.connect(mongoDbUrl, {
    useNewUrlParser: true, useUnifiedTopology: true,serverSelectionTimeoutMS: 5*1000
  },(err) => {
    if(err) console.log(err) 
    else console.log("mongdb is connected");
   });


const database = mongoose.connection
// console.log("db " ,database);

database.on('err',(err)=>{
    console.log(err)
})

database.once('connected',()=>{
    console.log("connected")
})

// app.listen(port,"197.250.99.31",(req,res)=>{
//     console.log(`app is listening at port http://localhost:${port}`)
// })


app.listen(port,(req,res)=>{
    console.log(`app is listening at port http://localhost:${port}`)
})