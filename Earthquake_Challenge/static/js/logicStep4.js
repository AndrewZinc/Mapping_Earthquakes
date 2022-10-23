
let earthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(earthquakeData).then(function(data) {

   console.log(data);

   // Place our GeoJSON feature on the map.
   createFeatures(data.features);

   // This function returns the style data for each of the earthquakes we plot on
   // the map. We pass the magnitude of the earthquake into a function
   // to calculate the radius
   function styleInfo(feature) {
      return {
         opacity: 1,
         fillOpacity: 1,
         fillColor:  getColor(feature.properties.mag),
         color: "#000000",
         radius: getRadius(feature.properties.mag),
         stroke: true,
         weight: 0.5
      }};

   // This function determines the color of the circle based on the magnitude of the earthquake.
   function getColor(magnitude) {
     if (magnitude > 5) {
       return "#ea2c2c";
     }
     if (magnitude > 4) {
       return "#ea822c";
     }
     if (magnitude > 3) {
       return "#ee9c00";
     }
     if (magnitude > 2) {
       return "#eecc00";
     }
     if (magnitude > 1) {
       return "#d4ee00";
     }
     return "#98ee00";
   }

   // This function determines the radius of the earthquake marker based on its magnitude.
   // Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
   function getRadius(magnitude) {
      if (magnitude === 0) {
      return 1;
      }
      return magnitude * 4;
   };
 
function createFeatures(earthquakeData) {
   function onEachFeature (feature, layer) {
      layer.bindPopup("<h2>Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place +"</h2>");
   };

   var earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature,
      // We turn each feature into a circleMarker on the map.
      pointToLayer: function(feature, latlng) {
               return L.circleMarker(latlng);
              },
              style: styleInfo
          });

   createMap(earthquakes);
};
});



function createMap(earthquakes) {
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

   var overlays = {
      Earthquakes: earthquakes,    
   };

   // Create a map object centered on the coords, with zoom level 3.
   var map = L.map("mapid", {
      center: [39.5, -98.5],
      zoom: 3,
      layers: [satelliteStreets, earthquakes]
   });

   // Add a legend
   var legend = L.control({position: 'bottomright'});
   console.log(legend);

   // Build the legend
   legend.onAdd = function () {
      var div = L.DomUtil.create('div', 'info legend');

      // Define colors that correspond to the magnitudes.
      const magnitudes = [0, 1, 2, 3, 4, 5];
      const colors = [
      "#98ee00",
      "#d4ee00",
      "#eecc00",
      "#ee9c00",
      "#ea822c",
      "#ea2c2c"
      ];
   
      // Looping through our intervals to generate a label with a colored square for each interval.
      for (var i = 0; i < magnitudes.length; i++) {
         console.log(colors[i]);
         div.innerHTML +=
         "<i style='background: " + colors[i] + "'></i> " +
         magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
      }
      return div;
   };

   // Add the legend to the map
   legend.addTo(map);

   // Pass our map layers into the layers control and add the layers control to the map.
   L.control.layers(baseMaps, overlays, {
      collapsed: false
   }).addTo(map);
};
