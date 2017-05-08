/*  JavaScript 6th Edition
    Chapter 11
    Hands-on Project 11-4

    Author: 
    Date:   

    Filename: script.js
*/

"use strict";

// global variable which can potentially hold multiple AJAX requests
var httpRequest = false;


function getRequestObject() {   // Ref:  pg 805 step 4
   try {
      httpRequest = new XMLHttpRequest();  //creates a new XHR object
   }
   catch (requestError) {  //the XHR threw an error, so provide manual input fields
      // display city & state fields and labels for manual input
      document.getElementById("csset").style.visibility = "visible";
      // remove event listeners so additional input is ignored
      var zip = document.getElementById("zip").value; 
       //since the input is manual, no need for event listeners
      if (zip.addEventListener) {
         zip.removeEventListener("keyup", checkInput, false);
      } else if (zip.attachEvent) {
         zip.detachEvent("onkeyup", checkInput);
      }
      return false;
   }
   return httpRequest;
}

//function to test the input value for the entered zip code  Ref: pg. 806, step 5
function checkInput() {
   var zip = document.getElementById("zip").value; 
   if (zip.length === 5) {    //when the input length = 5 (standard zip code)
      getLocation();  //calls the function that makes the AJAX call
   } else {
      document.getElementById("city").value = "";
      document.getElementById("state").value = "";
   }
}

//function to call the zippopotam.us API passing the zip code  Ref:  pg 806, step 6
function getLocation() {
   var zip = document.getElementById("zip").value; 
   if (!httpRequest) {
      httpRequest = getRequestObject();  //somethings wrong so manual input
   }
   httpRequest.abort();  //close any open requests
   httpRequest.open("get","https://api.zippopotam.us/us/" + zip, true);  //THIS IS THE CORS AJAX CALL
    //NOTE THAT THE THIRD ARGUMENT IS TRUE WHICH MAKES THIS ASYNCHRONOUS
   httpRequest.send();  //looks good, so let's send it!
   httpRequest.onreadystatechange = displayData;   //check the readystatechange field & call the function
                                                   //to display the data
}

function displayData() {   //Ref:  pg 806, step 7
    //the status is 200 which means the call to the page is good and the ready state indicator is 4 
    //which means that the data has been received
   if(httpRequest.readyState === 4 && httpRequest.status === 200) {
      var resultData = JSON.parse(httpRequest.responseText);  //parse the JSON key:value pairs
      var city = document.getElementById("city");
      var state = document.getElementById("state");
      city.value = resultData.places[0]["place name"];  //store the first instance of the city place name
      state.value = resultData.places[0]["state abbreviation"];  //store the first instance of the state abbrev.
      document.getElementById("zip").blur();   //lose focus on the zip field
      document.getElementById("csset").style.visibility = "visible";  //make the city and state visible
   }
}

//adds Event Listerners for the "keyup" event when the user releases a keyboard key
//Ref:  pg 804 step 3
var zip = document.getElementById("zip"); 
if (zip.addEventListener) {
   zip.addEventListener("keyup", checkInput, false);
} else if (zip.attachEvent) {
   zip.attachEvent("onkeyup", checkInput);
}
