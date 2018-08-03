var mapContainer = document.querySelector(".map");

var initMap = function () {
    var map = new google.maps.Map(mapContainer, {
        center: {lat: 33.7490, lng: -84.3880},
        zoom: 8
    });
}