var map;
var directionsService;
var directionsRenderer;

require('dotenv').config();
process.env.MAP_POINT

function initMap() {
    // 地図を生成して表示
    map = new google.maps.Map(document.getElementById("gmap"), {
        zoom: 15,
        center: new google.maps.LatLng(35.2288635, 138.9058909),
        mapTypeId: "roadmap"
    });
    directionsService = new google.maps.DirectionsService(); //DirectionsService のオブジェクトを生成
    directionsRenderer = new google.maps.DirectionsRenderer(); //DirectionsRenderer のオブジェクトを生成
}
initMap();