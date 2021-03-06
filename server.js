var http = require('http');
// var dt = require('./module1');
var fetch = require('node-fetch');
// var io = require('socket.io')(http);

var querystring = require('querystring');
const bodyParser = require('body-parser');

var imageSearch = require('node-google-image-search');

// var http = require('http').Server(app);
// var request = require('request');

// require('es6-promise').polyfill();
// require('isomorphic-fetch');

const express = require('express');
const app = express();
const myport = process.env.PORT || 5000;

const witUrl='https://api.wit.ai'
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

app.use(bodyParser.json())


app.get('/', function (req, res) {
    //handle the get for this route
    // res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    res.send('Hello Bot!');
})

app.post('/', function(req, res) {
    // get the content
    const message = req.body.message
    const sessionId = req.body.sessionId

    fetch(witUrl+'/converse?v=20170611&session_id='+sessionId+'&q='+message, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer W5Y3RZQ4J5AJWJZXVP7R5RPVAVVHAVSW'
        }
    })
        .then(r=> r.json())
        .then(j =>
    res.send(j)
    )
    //     .then (function(j) {
    //         res.send(j)
    //         console.log(j);
    //         var body = JSON.parse(j);
    //         if (body.type === 'msg') {
    //             res.send(body.msg)
    //         }
    //         if (body.type === 'action' && body.action === 'show_place') {
    //             if (body.entities.location  && body.entities.location[0].value) {
    //                 res.send('receive-message', ['https://s.inyourpocket.com/gallery/107415.jpg',
    //                     'https://media-cdn.tripadvisor.com/media/photo-s/01/1a/aa/11/magestic-view-on-swisloch.jpg',
    //                     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2N6AugSaEYx-d75dO-PTzONhmNdWGQ-fUOPfIuyITw9CDYnWy7w'])
    //             }
    //
    //         }
    //
    //     })
    .catch(e=> console.log('error in fetch with wit',e))


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

// io.on('connection', function (socket) {
//     console.log('we have a connection');
//     socket.on('new-message', function (data) {
//         flow.series([
//             function(callback){
//                 setTimeout(function(){
//                     chat_to_bot(data);
//                     console.log('I execute first');
//                     callback();
//                 },400);
//             },
//             function(callback){
//                 setTimeout(function(){
//                     chat_to_bot(['', data[1]]);
//                     console.log('I execute second');
//                     callback();
//                 },500);
//             },
//             function(callback){
//                 setTimeout(function(){
//                     chat_to_bot(['', data[1]]);
//                     console.log('I execute third');
//                     callback();
//                 },600);
//             },
//         ]);
//     });
// });