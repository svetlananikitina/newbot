/**
 * Created by svetlananikitina on 15/06/2017.
 */


//module that returns the current date and time

// exports.myDateTime = function () {
//     return Date();
// };
// var fetch = require('node-fetch');
// require('es6-promise').polyfill();
// require('isomorphic-fetch');


// var fruits = ['Banana','Apple','Orange','Mango'];
//
// //print array of fruits
// function loadFruits() {
//     document.getElementById("fruits").innerHTML = fruits;
// }
//
// //print fruit
// function myFunction() {
//     var fruit = prompt("What is your favorite fruit?");
//     fruits[fruits.length]= fruit;
//     document.getElementById("fruits").innerHTML = fruits;
//
// }

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el); // Append the second parameter(element) to the first one
}
// function submitMessage2() {
//     var message = document.getElementById("message").value;
//   //  var messages = this.state.messages;
//     messages.push(message);
// }

var d = document.getElementById("message");

d.addEventListener("keypress", submitMessage);

function submitMessage () {
    if (event.keyCode == 13) {
        alert("This text we send to Bot");
        var message = document.getElementById("message").value;
    }
    else {
        return false;
    }
}



// var fetch = require('node-fetch');

const ul = document.getElementById('messages');

fetch('https://sleepy-sierra-80270.herokuapp.com/')
    .then(function(res) {
        return res.text();
    }).then(function(body) {
    console.log(body);
   // document.write(JSON.stringify(body));

    // let messages = body;
    let messages = ['hi', 'hehe', 'yhy'];

    return messages.map(function(body) {
        let li = createNode('li'), //create elements we need to display
        span = createNode('span');
            let ul = document.getElementById('messages');

            console.log(body);

        span.innerHTML = "response is : "+ body;
        append (li, span);
        append (ul, li);
    })

});

console.log('after');

