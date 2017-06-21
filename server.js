var http = require('http');
// var dt = require('./module1');
var fetch = require('node-fetch');
var io = require('socket.io')(http);

var querystring = require('querystring');

// var http = require('http').Server(app);
// var request = require('request');

// require('es6-promise').polyfill();
// require('isomorphic-fetch');

const express = require('express');
const app = express();
const myport = process.env.PORT || 5000;

//create a server object:
// http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'}); //status code, response headers
//     res.write("Date and time are currently: ");
//     res.end('Hello bot!'); // end of response
// }).listen(myport); //the server object listens on port myport

//Respond with Hello World! when a GET request is made to the homepage

app.use(function(req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.get('/', function (req, res) {
    //handle the get for this route
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    res.send('Hello Bot!');
})

app.post('/', function(req, res) {
    // Handle the post for this route
});


app.listen(myport, function () {
    console.log('Example app listening on port!'+myport, process.env.MSG)
});



function chat_to_bot(data) {
    var msg = data[0];
    var session_id = data[1];
    var options = {
        host: 'api.wit.ai',
        port: 443,
        path: '/converse?' + querystring.stringify({v:20170611,
            session_id: session_id,
        }),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer W5Y3RZQ4J5AJWJZXVP7R5RPVAVVHAVSW'
        }
    };
    if (msg) {
        options.path = options.path + "&" + querystring.stringify({q:msg});
    }
    var req = https.request(options, callback);
    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });
    // write data to request body
    // req.write();
    req.end();
}

function callback (res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        if (body.type === 'msg') {
            // sending to the client
            io.emit('receive-message', body.msg);
        }

    });
}

io.on('connection', function (socket) {
    console.log('we have a connection');
    socket.on('new-message', function (data) {
        flow.series([
            function(callback){
                setTimeout(function(){
                    chat_to_bot(data);
                    console.log('I execute first');
                    callback();
                },400);
            },
            function(callback){
                setTimeout(function(){
                    chat_to_bot(['', data[1]]);
                    console.log('I execute second');
                    callback();
                },500);
            },
            function(callback){
                setTimeout(function(){
                    chat_to_bot(['', data[1]]);
                    console.log('I execute third');
                    callback();
                },600);
            },
        ]);
    });
});