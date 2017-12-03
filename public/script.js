/*  JavaScript 6th Edition
    Chapter 11
    Hands-on Project 11-4

    Author: 
    Date:   

    Filename: script.js
*/

"use strict";


//adds Event Listerners for the "keyup" event when the user releases a keyboard key
//Ref:  pg 804 step 3
var zip = document.getElementById("zip"); 
if (zip.addEventListener) {
   zip.addEventListener("keyup", checkInput, false);
} else if (zip.attachEvent) {
   zip.attachEvent("onkeyup", checkInput);
}
