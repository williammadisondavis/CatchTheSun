# Catch the Sun
**A web application for active explorers yearning to discover their next adventure, find hidden gem sceneries, and catch a beautiful sunset. Uses the Google Maps API.**

This is a frontend group project built with HTML/CSS, JavaScript, and the Google Maps API.

## Contributors
* Liz Khuu
* Clint Urbin
* Will Davis

## Getting Started

* STEP 1 | Obtain a Google Maps API Key

  In order to run our web application, you will need to obtain a Google Maps API Key. To do so, please head over to the Google Maps Platform for Developers at: https://developers.google.com/maps/documentation/javascript/get-api-key and follow the instructions. 

  *Please note:* You must have a current Gmail account or create a new one in order to continue.

* STEP 2 | Clone the project repository and go into it

  Run the following commands:

  ```
  git clone git@github.com:williammadisondavis/CatchTheSun.git
  cd CatchTheSun\
  ```

* STEP 3 | Once in the project repository, go into the scripts folder and create a new file called config.js

  ``` 
  cd scripts
  touch config.js
  ```

* STEP 4 | In config.js, this is where we are going to hide the Google Maps API Key

  In config.js, add the following, replacing "your-key-here" with the Google Maps API Key that you have obtained from Step 1:

  ```
  var config = {
    GM_KEY: "your-key-here"
  };
  ```

  Save the file and you are ready to run the application. Yay! :)