
let torontoHoods = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

console.log(torontoHoods);

d3.json(torontoHoods).then(function(data) {
   console.log(data);
   // Place our GeoJSON feature on the map.
   createFeatures(data.features);
  });

 
function createFeatures(torontoHoods) {
   function onEachFeature (feature, layer) {
      layer.bindPopup("<h2>Neighborhood: " + feature.properties.AREA_NAME +"</h2>");
   }

   var neighborhoods = L.geoJSON(torontoHoods, {
      onEachFeature: onEachFeature,
      color: "blue",
      weight: 1,
      fillColor: "yellow",
      fillOpacity: 0.4
   });

   createMap(neighborhoods);
};
  
function createMap(neighborhoods) {
// We create the tile layer that will be the background of our map.
   var streets = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
      maxZoom: 18,
      zoomControl: true,
      accessToken: API_KEY
   });

   // We create the tile layer that will be the background of our map.
   var satelliteStreets = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
      maxZoom: 18,
      zoomControl: true,
      accessToken: API_KEY
   });

   // Create a base layer that holds both maps.
   var baseMaps = {
      "Streets": streets,
      "Satellite": satelliteStreets
   };

   var overlayMaps = {
      "Toronto Neighborhoods": neighborhoods
   };

   // Create a map object centered on the coords, with zoom level 3.
   var map = L.map("mapid", {
      center: [39.5, -98.5],
      zoom: 3,
      layers: [satelliteStreets]
   });



   // Pass our map layers into the layers control and add the layers control to the map.
   L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
   }).addTo(map);
};


