/**
 * Created by svetlananikitina on 15/06/2017.
 */


//module that returns the current date and time

// exports.myDateTime = function () {
//     return Date();
// };

var fruits = ['Banana','Apple','Orange','Mango'];

//print array of fruits
function loadFruits() {
    document.getElementById("fruits").innerHTML = fruits;
}

//print fruit
function myFunction() {
    var fruit = prompt("What is your favorite fruit?");
    fruits[fruits.length]= fruit;
    document.getElementById("fruits").innerHTML = fruits;

}

