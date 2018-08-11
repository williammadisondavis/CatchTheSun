var pins = pinsData.PINS;

var gmKey = config.GM_KEY;
var map;
var mapContainer = document.querySelector(".map");
var searchListings = document.querySelector(".search-listings");
var modalScreen = document.querySelector(".modal-screen");
var modalImage = document.querySelector(".modal-image");
var modalTitle = document.querySelector(".modal-title");
var modalDescription = document.querySelector(".modal-description");
var modalCloseButton = document.querySelector(".close-modal");

var initMap = function () {
    map = new google.maps.Map(mapContainer, {
        center: {lat: 33.7490, lng: -84.3880},
        zoom: 10
    });
    var infoWindow = new google.maps.InfoWindow();
    loadSearchBox();
    handleMapIdleEvent(infoWindow);
};

var handleMapIdleEvent = function (infoWindow) {
    google.maps.event.addListener(map, "idle", function () {
        addMarkersToMap(infoWindow, getVisibleMarkers());
        showVisibleMarkers(getVisibleMarkers());
    });
};

var getVisibleMarkers = function () {
    var visibleMarkers = [];
    var mapBounds = map.getBounds();
    pins.forEach(function (pin) {
        if (mapBounds.contains(pin.position)) {
            visibleMarkers.push(pin)
        }
    })
    return visibleMarkers;
};

var showVisibleMarkers = function (visibleMarkers) {
    clearListingDisplay();
    visibleMarkers.forEach(function (pinMarker) {
        searchListings.appendChild(displayListing(pinMarker));
    })
};

var clearListingDisplay = function () {
    var listings = document.querySelectorAll(".listing");
    listings.forEach(function (listing) {
        listing.remove();
    })
};

var displayListing = function (pin) {
    var listing = document.createElement("div");
    listing.classList.add("listing");
    listing.appendChild(listingImageDisplay(pin));
    listing.appendChild(listingInfoDisplay(pin));
    listing.appendChild(listingArrowDisplay());
    listing.addEventListener("click", function () {
        openModalScreen(pin);
    });
    return listing;
};

var listingArrowDisplay = function () {
    var listingArrow = document.createElement("div");
    listingArrow.classList.add("listing-arrow");
    listingArrow.textContent = ">";
    return listingArrow;
}

var listingInfoDisplay = function (pin) {
    var listingInfoContainer = document.createElement("div");
    listingInfoContainer.classList.add("listing-info");
    listingInfoContainer.appendChild(listingInfoTitle(pin));
    listingInfoContainer.appendChild(listingInfoSummary(pin));
    return listingInfoContainer;
};

var listingInfoTitle = function (pin) {
    var listingTitle = document.createElement("h3");
    listingTitle.classList.add("listing-title");
    listingTitle.textContent = pin.title;
    return listingTitle;
};

var listingInfoSummary = function (pin) {
    var listingSummary = document.createElement("p");
    listingSummary.classList.add("listing-summary");
    listingSummary.classList.add("summary-visibility");
    listingSummary.textContent = pin.summary;
    return listingSummary;
};

var listingImageDisplay = function(pin) {
    var listingImage = document.createElement("img");
    listingImage.classList.add("listing-image");
    listingImage.setAttribute("src", pin.image);
    return listingImage;
};

var addMarkersToMap = function (infoWindow, visiblePins) {
    visiblePins.forEach( function (pin) {
        var markerIcon = {
            url: 'https://maps.google.com/mapfiles/kml/shapes/sunny.png',
            size: new google.maps.Size(30, 30),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 0),
            scaledSize: new google.maps.Size(30, 30),
        };
        var marker = new google.maps.Marker( {
            position: pin.position,
            map: map,
            icon: markerIcon,
            title: pin.title
        });
        google.maps.event.addListener(marker, 'click', function() {
            infoWindow.setContent(addInfoWindowContent(pin));
            infoWindow.open(map, marker);
            window.setTimeout(function() {
                displaySelectedMarkerFirst(pin);
            }, 500);
        });
    })
};

var displaySelectedMarkerFirst = function (selectedMarker) {
    var visibleMarkers = getVisibleMarkers();
    var firstMarker;
    var remainingMarkers = [];
    visibleMarkers.forEach(function (marker) {
        marker === selectedMarker ? firstMarker = marker : remainingMarkers.push(marker);
    });
    showHighlightedFirstMarker(firstMarker, remainingMarkers);
};

var showHighlightedFirstMarker = function (firstMarker, remainingMarkers) {
    clearListingDisplay();
    var highlightedLisiting = displayListing(firstMarker);
    highlightedLisiting.classList.add("highlight-listing");
    searchListings.appendChild(highlightedLisiting);
    remainingMarkers.forEach(function (marker) {
        searchListings.appendChild(displayListing(marker));
    })
};

var addInfoWindowContent = function (pin) {
    var infoWindowContent = document.createElement("div");
    infoWindowContent.classList.add("info-window");
    infoWindowContent.appendChild(infoWindowTitle(pin));
    infoWindowContent.appendChild(infoWindowImage(pin));
    return infoWindowContent;
};

var infoWindowTitle = function (pin) {
    var infoWindowTitle = document.createElement("p");
    infoWindowTitle.classList.add("info-window-title");
    infoWindowTitle.textContent = pin.title;
    return infoWindowTitle;
};

var infoWindowImage = function (pin) {
    var infoWindowImage = document.createElement("img");
    infoWindowImage.classList.add("info-window-image");
    infoWindowImage.setAttribute("src", pin.image);
    return infoWindowImage;
};

var openModalScreen = function (pin) {
    modalScreen.classList.remove("hidden");
    modalImage.setAttribute("src", pin.image);
    modalTitle.textContent = pin.title;
    modalDescription.textContent = pin.description;
};

var windowOnClick = function (event) {
    if (event.target === modalScreen) {
        hideModalScreen();
    }
};

var hideModalScreen = function () {
    modalScreen.classList.add("hidden");
};

var loadSearchBox = function () {
    var searchInput = document.querySelector(".search-input");
    var searchBox = new google.maps.places.SearchBox(searchInput);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchInput);
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds());
    });
    searchBox.addListener("places_changed", function () {
        searchBoxListener(searchBox);
    });
};

var searchBoxListener = function (searchBox) {
    var places = searchBox.getPlaces();
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
        if (place.geometry.viewport) {
            bounds.union(place.geometry.viewport);
        } else {
            bounds.extend(place.geometry.location);
        }
        });
        map.fitBounds(bounds);
};

modalCloseButton.addEventListener("click", hideModalScreen);
window.addEventListener("click", windowOnClick);