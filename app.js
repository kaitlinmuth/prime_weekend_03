var map;

function initialize(latLng) {

    //create a JS object literal to hold map options
    var mapOptions = {
        center: new google.maps.LatLng(51.508742,-0.120850),
        zoom: 14,
        //initialize a road map type map
        mapTypeId : google.maps.MapTypeId.ROADMAP,
        // idea for later: add choice for Terrain style map
        mapTypeControl: false,
        streetViewControl: false,
        styles: mapStyles

    };

    console.log("Created map options ", mapOptions);
    //create a Map object and pass it to the map-canvas div
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    console.log("Created map ", map);
    return map;
}

//define water and park options separately so they can be easily modified
var parkOptions = {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{visibility: 'on'}, {color: '#bdbdb9'}]
};

// this is where to set the initial style options for the map
var mapStyles = [
    // set background color
    {
        featureType: 'all',
        elementType: 'geometry',
        stylers: [{color: '#ffffff'}]
    },
    // turn off all labels
    {
        featureType: 'all',
        elementType: 'labels',
        stylers: [{visibility: 'off'}]
    },

    //set roads to simple visibility and give them a uniform background color
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{visibility: 'simplified'}, {weight: '1'}, {color: '#525157'}]
    },
    //make the water pretty
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#bcc9d1'}]
    },
    // don't display transit
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{visibility: 'off'}]
    },
    //don't display landscape
    {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [{visibility: 'off'}]
    },
    //don't display POI, except for parks
    {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{visibility: 'off'}]
    },

    //use custom park options
    parkOptions
];

$(document).ready(function(){
    map = google.maps.event.addDomListener(window, 'load', initialize);

    $('.controls').on('click', '#parksBtnFalse', function(){
        console.log("clicked parks button false!");
        parkOptions.stylers = [{visibility: 'off'}];
        initialize();
    });

    $('.controls').on('click', '#parksBtnTrue', function(){
        console.log("clicked parks button true!");
        parkOptions.stylers = [{visibility: 'on'}, {color: '#bdbdb9'}];
        initialize();
    });

});