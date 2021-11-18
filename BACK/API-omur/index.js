// require .env file
const dotenv = require("dotenv").config({ path: '../.env' });
console.log(dotenv)
//express initialization
const express = require("express");

const app = express();

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// using cors to allow connecting from anywhere
const cors = require('cors');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors({
  // origin: "http://localhost:3000/",
  credentials:true,

  allowedHeaders: ["authorization", "Content-Type"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
}));

// router initialization
const router = require("./app/router");
app.use(router);

// PORT configuration
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Le serveur est lancé sur http://localhost:${PORT}`);
});


