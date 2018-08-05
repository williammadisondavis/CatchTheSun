var pins = [
    { 
      title: "Stone Mountain",
      position: {lat: 33.8082, lng: -84.1702}, 
      description: "Gummies fruitcake marshmallow chocolate oat cake tootsie roll marshmallow cookie pie. Oat cake bonbon biscuit lemon drops. Bonbon bear claw bonbon cotton candy sweet pie jelly beans.", 
      image: "images/image01.jpg" 
    },
    { 
      title: "Arabia Mountain",
      position: {lat: 33.6651, lng: -84.11182}, 
      description: "Pastry cookie caramels pudding. Fruitcake sweet roll jelly-o cookie gummi bears liquorice. Bonbon jelly-o jujubes powder marzipan biscuit topping marshmallow marshmallow.", 
      image: "images/image02.jpg" 
    },
    { 
      title: "Glenn Hotel Rooftop Bar",
      position: {lat: 33.759126, lng: -84.394726}, 
      description: "Dragée muffin jujubes. Donut chocolate cake tootsie roll cake danish macaroon sweet. Sweet cake cake chocolate bar danish icing ice cream jelly beans. Marshmallow bear claw jelly.", 
      image: "images/image03.jpg" 
    },
    { 
      title: "Lullwater Park",
      position: {lat: 33.802188, lng: -84.314281}, 
      description: "Jujubes bonbon toffee brownie jelly-o bonbon jelly-o chocolate bar. Jelly-o caramels tiramisu sweet chocolate bar. Cake jelly-o sweet apple pie.", 
      image: "images/image04.jpg" 
    },
    { 
      title: "Morningside Nature Preserve Trail",
      position: {lat: 33.806707, lng: -84.356759}, 
      description: "Sugar plum pie chocolate cake cake ice cream gummies marshmallow. Donut liquorice bonbon jelly topping bear claw bear claw icing sweet. Ice cream macaroon halvah dessert pie gummi bears.", 
      image: "images/image05.jpg" 
    },
];

var mapContainer = document.querySelector(".map");

var initMap = function () {
    var map = new google.maps.Map(mapContainer, {
        center: {lat: 33.7490, lng: -84.3880},
        zoom: 10
    });
    var infoWindow = new google.maps.InfoWindow();
    addPinsToMap(map, infoWindow);
};

var addPinsToMap = function (map, infoWindow) {
    pins.forEach( function (pin) {
        var marker = new google.maps.Marker( {
            position: pin.position,
            map: map,
            title: pin.title
        });
        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.setContent(addInfoWindowContent(pin));
            infoWindow.open(map, marker);
        });
    })
};

var addInfoWindowContent = function (pin) {
    var infoWindowContent = document.createElement("div");
    infoWindowContent.classList.add("infoWindow")
    var infoWindowImage = document.createElement("img");
    infoWindowImage.classList.add("infoWindowImage");
    infoWindowImage.setAttribute("src", pin.image);
    infoWindowContent.appendChild(infoWindowImage);
    return infoWindowContent;
}