var http = require('http');
var dt = require('./module1');
// var fetch = require('node-fetch');
// require('isomorphic-fetch');

//var header = new Headers();


const express = require('express');
const app = express();

const myport = process.env.PORT || 5000;

//create a server object:
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'}); //status code, response headers
    res.write("Date and time are currently: " + dt.myDateTime());
    res.end('Hello bot!'); // end of response
}).listen(myport); //the server object listens on port myport

//Respond with Hello World! when a GET request is made to the homepage

app.use(function(req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.get('/', function (req, res, next) {
    //handle the get for this route
    res.send('Hello World')

})


app.listen(3000, function () {
    console.log('Example app listening on port!'+myport, process.env.MSG)
});

