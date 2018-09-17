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

## Challenges

* MOVE LISTING FOR SELECTED MARKER TO TOP OF DISPLAY  
    
  - How the feature works:  
      1) The user selects a marker on the map
      2) An Info Window for that marker is opened
      3) The listing for the selected marker is moved to the top of the display
  
  - Problem:  
    When the user selects a marker on the map, the marker’s informational window opening would sometimes cause the viewport to shift. This viewport shift would then trigger the listings results to refresh, and then overwrite the initial call to display the user’s selected marker first. Thus, the user would continue to see an unordered display of listings.
  
  - Solution:  
    To fix this problem, the displaySelectedMarkerFirst function call was wrapped in a setTimeout function. This gave the map a half second to refresh itself before updating the display listings.
    ```
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(addInfoWindowContent(pin));
      infoWindow.open(map, marker);
      window.setTimeout(function() {
          displaySelectedMarkerFirst(pin);
      }, 500);
    });
    ```