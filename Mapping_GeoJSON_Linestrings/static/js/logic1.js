
let flightData = "torontoRoutes.json";

console.log(flightData);

d3.json(flightData).then(function(data) {
   console.log(data);
   // Place our GeoJSON feature on the map.
   createFeatures(data.features);
  });

 
function createFeatures(flightData) {
   function onEachFeature (feature, layer) {
      layer.bindPopup("<h2>Airline: " + feature.properties.airline +"<hr>Destination: "+ feature.properties.dst +"</h2>");
   }

   var flights = L.geoJSON(flightData, {
      onEachFeature: onEachFeature
   });

   createMap(flights);
};
  
function createMap(flights) {
// We create the tile layer that will be the background of our map.
   var streets = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
      maxZoom: 18,
      zoomControl: true,
      accessToken: API_KEY
   });

   // We create the tile layer that will be the background of our map.
   var dark = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
      maxZoom: 18,
      zoomControl: true,
      accessToken: API_KEY
   });

   // Create a base layer that holds both maps.
   var baseMaps = {
      "Street Map": streets,
      "Dark Map": dark
   };

   var overlayMaps = {
      "Toronto Flights": flights
   };

   // Create a map object centered on the coords, with zoom level 2.
   var map = L.map("mapid", {
      center: [44, -80.0],
      zoom: 2,
      layers: [streets, flights]
   });



   // Pass our map layers into the layers control and add the layers control to the map.
   L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
   }).addTo(map);
};


