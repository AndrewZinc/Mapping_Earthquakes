// Add console log to see if our code is working.
console.log("working");

// Create a map object centered on the coords, with zoom level 4.
let map = L.map("mapid").setView([37.5, -122.5], 10);

// Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};

// Place our GeoJSON feature on the map.
 L.geoJSON(sanFranAirport).addTo(map);

L.geoJSON(sanFranAirport, {
   pointToLayer: function(feature, latlng) {
      return L.marker(latlng)
       .bindPopup("<h2>Airport Code: " + feature.properties.faa +"<hr>Airport Name: "+ feature.properties.name +"</h2>");
 }
}).addTo(map);

// L.geoJSON(sanFranAirport, {
//    onEachFeature: function(feature, layer) {
//       console.log(layer);
//       layer.bindPopup();
// //"<h2>" + "Airport Code: " + feature.properties.faa +"<hr>" + "Airport Name: "+ feature.properties.name +"</h2>"
//    }
// });



// We create the tile layer that will be the background of our map.
let streets = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
    maxZoom: 18,
    zoomControl: true,
    accessToken: API_KEY
});
// Then we add our "graymap" tile layer to the map.
streets.addTo(map);

var marker = L.marker([42.142872, -71.516830]).addTo(map)
.bindPopup("A town in Massachusetts.");

L.circle([34.0522, -118.2437], {
    stroke: "true",
    color: "black",
    fill: "true",
    fillColor: "#ffff66",
    fillOpacity: 0.6,
    radius: 300
 }).addTo(map);

 // circleMarker
 L.circleMarker([42.1435, -71.5245], {
    stroke: "true",
    color: "blue",
    fill: "true",
    fillColor: "yellow",
    fillOpacity: 0.5,
    radius: 25
 }).addTo(map).bindPopup("A neighborhood in a town in Massachusetts.");

 // Add coords for a polyline.
 let line = [
    [33.9416, -118.4085],
    [37.6213, -122.3790],
    [40.7899, -111.9791],
    [47.4502, -122.3088]
 ];

 // Add a red polyline between the points.
 L.polyline(line, {
    color: "yellow"
 }).addTo(map);

 // Skill drill - polyline from SFO - AUS - YYZ - JFK - BOS
 let airline = [
    [37.6213, -122.3790],
    [30.264980, -97.746600],
    [43.633250, -79.397090],
    [40.645810, -73.780280],
    [42.356870, -71.039310]
 ];

  // Add a blue-dashed polyline between the points.
  L.polyline(airline, {
    color: "blue",
    weight: 4,
    opacity: 0.5,
    dashArray: "20, 20"
 }).addTo(map);

