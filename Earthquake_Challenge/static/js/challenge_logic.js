// Create the tile layer that will be the background of the map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create the second tile layer that will be the background of the map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create the third tile layer that will be the background of the map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create a base layer that holds all three maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets,
  "Dark": dark
};

// Add a layer group for each data set.
let allEarthquakes = new L.LayerGroup();
let tectonicPlates = new L.LayerGroup();
let majorEarthquakes = new L.LayerGroup();

// Add a reference to the tectonic plates group to the overlays object.
let overlays = {
  "Earthquakes": allEarthquakes,
  "Tectonic Plates": tectonicPlates,
  "Major Earthquakes": majorEarthquakes
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [40.7, -94.5],
	zoom: 3,
	layers: [streets, allEarthquakes, tectonicPlates]
});

// Then we add a control to the map that will allow the user to specify the visible layers.
var layersControl = L.control.layers(baseMaps, overlays).addTo(map);

//---------------------------------------- Major Earthquakes-----------------------------------------
// Build the Major Earthquake layer first to ensure the initial map display presents - All Earthquakes on top.
let majorEarthquakeData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

// Retrieve the major earthquake GeoJSON data >4.5 mag for the week.
d3.json(majorEarthquakeData).then(function(data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into two separate functions
  // to calculate the color and radius.
  function majorStyleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getMajorColor(feature.properties.mag),
      color: "#000000",
      radius: getMajorRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  };

  // This function determines the three marker colors based on the magnitude of the earthquake.
  function getMajorColor(magnitude) {
    if (magnitude > 6) {
      return "#c51b8a";
    }
    if (magnitude > 5) {
      return "#fa9fb5";
    }
    return "#fde0dd";
  };

  // This function determines the radius of the earthquake marker based on its magnitude.
  function getMajorRadius(magnitude) {
    return magnitude * 4;
  };

  // Creating a GeoJSON layer with the retrieved major earthquake data.
  L.geoJson(data, {
    // Plot each feature as a circleMarker.
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng);
      },
    // Set the style for each circleMarker using our styleInfo function.
  style: majorStyleInfo,
  // Create a popup for each circleMarker to display the magnitude and location of the earthquake
  // after the marker has been created and styled.
  onEachFeature: function(feature, layer) {
    layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }
  }).addTo(majorEarthquakes);

// Add the earthquake layer to the map.
majorEarthquakes.addTo(map);
});

// Create a major Earthquakes legend control object.
var majorEQlegend = L.control({
  position: "bottomright"
});

// Add all the color and scale details for the legend
majorEQlegend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");

  const magnitudes = [4, 5, 6];
  const colors = [
    "#fde0dd",
    "#fa9fb5",
    "#c51b8a"];

  // Looping through the intervals to generate a label with a colored square for each interval.
  for (var i = 0; i < magnitudes.length; i++) {
  // console.log(colors[i]);
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    };
  return div;
};

// Add the legend to the map.
majorEQlegend.addTo(map);

// Retrieve the all-earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. Using the same methodology as for major Earthquakes above.
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  };

  // This function determines the color of the marker based on the magnitude of the earthquake.
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
  };

  // This function determines the radius of the earthquake marker based on its magnitude.
  // Provide a minimum radius for Earthquakes with a magnitude of 0.
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  };

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
      // Plot each feature as a circleMarker.
      pointToLayer: function(feature, latlng) {
          //console.log(data);
          return L.circleMarker(latlng);
        },
      // Set the style for each circleMarker using the styleInfo function.
    style: styleInfo,
      // Create a popup for each circleMarker to display the magnitude and location of the earthquake after the marker has been created and styled.
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
      }
  }).addTo(allEarthquakes);
});

// Add the earthquake layer to the map.
allEarthquakes.addTo(map);

// Create an All Earthquakes legend control object.
var allEQlegend = L.control({
  position: "bottomright"
});

// Add all the details for the legend
allEQlegend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");

  const magnitudes = [0, 1, 2, 3, 4, 5];
  const colors = [
    "#98ee00",
    "#d4ee00",
    "#eecc00",
    "#ee9c00",
    "#ea822c",
    "#ea2c2c"];

  // Looping through the intervals to generate a label with a colored square for each interval.
  for (var i = 0; i < magnitudes.length; i++) {
    // console.log(colors[i]);
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    };
  return div;
};

// Add the legend to the map.
allEQlegend.addTo(map);

// Create a variable for the raw tectonic plate geoJSON data
let tectonicData = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// Use d3.json to make a call to get our Tectonic Plate geoJSON data.
d3.json(tectonicData).then(function(data) {
  // Create a geoJSON layer with the data with basic styling.
  L.geoJson(data, {
    style: {
      stroke: true,
      color: 'orange',
      weight: 2
      },
    }
  ).addTo(tectonicPlates);
});

