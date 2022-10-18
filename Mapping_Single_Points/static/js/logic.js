// Add console log to see if our code is working.
console.log("working");

// Create a map object centered on the coords, with zoom level 4.
let map = L.map('mapid').setView([40.7, -94.5], 4);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    zoomControl: true,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

var marker = L.marker([42.142872, -71.516830]).addTo(map)
.bindPopup('A town in Massachusetts.');

L.circle([34.0522, -118.2437], {
    stroke: 'true',
    color: 'black',
    fill: 'true',
    fillColor: '#ffff66',
    fillOpacity: 0.6,
    radius: 300
 }).addTo(map);

 // circleMarker
 L.circleMarker([42.1435, -71.5245], {
    stroke: 'true',
    color: 'blue',
    fill: 'true',
    fillColor: 'fafa07',
    radius: 25
 }).addTo(map).bindPopup('A neighborhood in a town in Massachusetts.');