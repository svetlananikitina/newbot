var http = require('http');
var dt = require('./module1');


const express = require('express');
const app = express();

const myport = process.env.PORT || 5000;

//create a server object:
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'}); //status code, response headers
    res.write("Date and time are currently: " + dt.myDateTime());
    res.end('Hello bot!'); // end of response
}).listen(myport); //the server object listens on port myport


// app.get('/', function (req, res) {
//     res.send('Hello I am chat bot')
//
// })



app.listen(3000, function () {
    console.log('Example app listening on port!'+myport, process.env.MSG)
});

