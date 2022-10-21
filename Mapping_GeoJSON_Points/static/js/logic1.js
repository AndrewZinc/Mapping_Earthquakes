
// We create the tile layer that will be the background of our map.
let streets = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}", {
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
   Street: streets,
   Dark: dark
};

// Create a map object centered on the coords, with zoom level 4.
let map = L.map("mapid", {
   center: [30, 3],
   zoom: 2,
   layer: [streets]
});

// Pass our map layers into the layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

let airData = d3.json("https://raw.githubusercontent.com/AndrewZinc/Mapping_Earthquakes/Mapping_GeoJSON_Points/Mapping_GeoJSON_Points/majorAirports.json");

airData.then(function(data) {
   // Place our GeoJSON feature on the map.
   L.geoJSON(data).addTo(map);
  });

  console.log("starting L.geoJSON(airData");
  
L.geoJSON(airData, {
   onEachFeature: function(feature, layer) {
      console.log(layer);
      layer.bindPopup().bindPopup("<h2>Airport Code: " + feature.properties.faa +"<hr>Airport Name: "+ feature.properties.name +"</h2>");
      ;
   }
});




