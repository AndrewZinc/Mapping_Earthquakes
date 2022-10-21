
// We create the tile layer that will be the background of our map.
let light = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
    maxZoom: 18,
    zoomControl: true,
    accessToken: API_KEY
});

// We create the tile layer that will be the background of our map.
let dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
    maxZoom: 18,
    zoomControl: true,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
   Light: light,
   Dark: dark
};

// Create a map object centered on the coords, with zoom level 4.
let map = L.map("mapid", {
   center: [44, -80.0],
   zoom: 2,
   layers: [light]
});

// Pass our map layers into the layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// var popup = L.popup()
//    .setLatLng([51.513, -0.09])
//    .setContent("I am a standalone popup.")
//    .addTo(map);


// var popup = L.popup();

// function onMapClick(e) {
//    popup
//       .setLatLng(e.latlng)
//       .setContent("You clicked the map at " + e.latlng.toString())
//       .openOn(map);
// };

// map.on('click', onMapClick);
let flightData = "torontoRoutes.json";
let airData = d3.json("https://raw.githubusercontent.com/AndrewZinc/Mapping_Earthquakes/Mapping_GeoJSON_Points/Mapping_GeoJSON_Points/majorAirports.json");
let bData = "https://raw.githubusercontent.com/AndrewZinc/Mapping_Earthquakes/Mapping_GeoJSON_Points/Mapping_GeoJSON_Points/majorAirports.json";

console.log(flightData);

d3.json(flightData).then(function(data) {
   // Place our GeoJSON feature on the map.
   L.geoJSON(data).addTo(map);
  });


  
// var marker = L.marker([42.142872, -71.516830]).addTo(map)
//    .bindPopup('A town in Massachusetts.');

// console.log("starting marker layer popups");

// L.marker(airData, {
//    onEachFeature: function(feature, layer) {
//       console.log("layer ");
//       layer.bindPopup("<h2>Airport Code: " + feature.properties.faa +"<hr>Airport Name: "+ feature.properties.name +"</h2>");
//    }
// }).addTo(map);

// console.log("starting geoJSON layer popups");

// var layerGroup =  L.geoJSON(bData, {
//    onEachFeature: function(feature, layer) {
//       layer.bindPopup("<h2>Airport Code: " + feature.properties.faa +"<hr>Airport Name: "+ feature.properties.name +"</h2>");
//    }
// }).addTo(map);

