var map;
var directionsService;
var directionsRenderer;
// let cullentposi;
// let updatatime = 4000;
// let Carposi;
// let Stlocation = [];
// let Stmarker = [];
// let Stdata;
// let infoWindow = [];
// let newgole;
// let makeload;
// let currentlatlng;
// let getlatlLng;
// let cleateMaker;
// let currentInfoWindow = null;
// let result_st;
// getaws();

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

// function delayfunc() {
    // function initMap() {
    //     // 地図を生成して表示
    //     map = new google.maps.Map(document.getElementById("gmap"), {
    //         zoom: 15,
    //         center: new google.maps.LatLng(currentlat, currentlon),
    //         mapTypeId: "roadmap"
    //     });
    //     directionsService = new google.maps.DirectionsService(); //DirectionsService のオブジェクトを生成
    //     directionsRenderer = new google.maps.DirectionsRenderer(); //DirectionsRenderer のオブジェクトを生成
    // }
    // initMap();

    // cullentposi = new google.maps.LatLng(currentlat, currentlon);
    // var Carinitmarker = {
    //     position: cullentposi,
    //     map: map,
    //     icon: {
    //         url: 'img/car_point.svg',
    //         scaledSize: new google.maps.Size(40, 30) //サイズ
    //     },
    //     animation: google.maps.Animation.DROP
    // };
    // Carposi = new google.maps.Marker(Carinitmarker);

    // function fetchget() {
    //     var url = 'https://stg.api.evfcv.awstemp.toyota.jp/?method=getHydrogenStationInfo&lat=141.936598&lon=45.523156&result=json&collect_count=0';
    //     fetch(url)
    //         .then(function (data) {
    //             return data.json();
    //         })
    //         .then(function (json) {
    //             result_st = json;
    //             for (var i = 0; i < result_st.resultData.stationList.length; i++) {
    //                 Stlocation.push({
    //                     "type": "Feature",
    //                     "properties": {
    //                         "name": result_st.resultData.stationList[i].info.stationName,
    //                         "operationStatus": result_st.resultData.stationList[i].info.operationStatus,
    //                         "postalCode": result_st.resultData.stationList[i].info.postalCode,
    //                         "closingDate": result_st.resultData.stationList[i].info.closingDate,
    //                         "addressJp": result_st.resultData.stationList[i].info.addressJp,
    //                         "openingHours": result_st.resultData.stationList[i].info.openingHours,
    //                         "payment": result_st.resultData.stationList[i].info.payment,
    //                         "stationType": result_st.resultData.stationList[i].info.stationType,
    //                         "updateDateTime": result_st.resultData.stationList[i].info.updateDateTime,
    //                         "tel": result_st.resultData.stationList[i].info.tel,
    //                     },
    //                     "geometry": {
    //                         "type": "Point",
    //                         "coordinates": ([result_st.resultData.stationList[i].lon, result_st.resultData
    //                             .stationList[i].lat
    //                         ]),
    //                     },
    //                 });


    //                 let latlondata = {
    //                     lat: Number(result_st.resultData.stationList[i].lat),
    //                     lng: Number(result_st.resultData
    //                         .stationList[i].lon)
    //                 };

    //                 if (result_st.resultData.stationList[i].info.stationType == "移動式") {
    //                     if (result_st.resultData.stationList[i].info.operationStatus == "0") {
    //                         viewicon = 'img/mobile_off.png';
    //                     } else {
    //                         viewicon = 'img/mobile_on.png';
    //                     }
    //                 } else {
    //                     if (result_st.resultData.stationList[i].info.operationStatus == "0") {
    //                         viewicon = 'img/fixed_off.png';
    //                     } else {
    //                         viewicon = 'img/fixed_on.png';
    //                     }
    //                 }

    //                 Stmarker[i] = new google.maps.Marker({
    //                     position: latlondata,
    //                     map: map,
    //                     icon: {
    //                         url: viewicon,
    //                         scaledSize: new google.maps.Size(60, 60) //サイズ
    //                     }
    //                 });

    //                 infoWindow[i] = new google.maps.InfoWindow({
    //                     content: Stlocation[i].properties.name + "<br>" +
    //                         "〒　　：" + Stlocation[i].properties.postalCode + "<br>" +
    //                         "住所　：" + Stlocation[i].properties.addressJp + "<br>" +
    //                         Stlocation[i].properties.closingDate + "<br>" +
    //                         "時間　：" + Stlocation[i].properties.openingHours + "<br>" +
    //                         "電話　：" + Stlocation[i].properties.tel + "<br>" +
    //                         "支払　：" + Stlocation[i].properties.payment + "<br>" +
    //                         "最終更新：" + Stlocation[i].properties.updateDateTime + "<br>" +
    //                         '<button type="button" name="gotohere" value="go" onclick="makeload()">ここにいく</button>'
    //                 });
    //                 markerEvent(i);


    //                 function markerEvent(i) {
    //                     Stmarker[i].addListener('click', function (e) {
    //                         if (currentInfoWindow != null) {
    //                             currentInfoWindow.close();
    //                         }
    //                         infoWindow[i].open(map, Stmarker[i]);
    //                         currentInfoWindow = infoWindow[i];
    //                         currentlatlng = e.latLng;
    //                         // document.getElementById("console").innerHTML = e.latLng;
    //                     });
    //                 };

    //             };

    //         })
    // }
    // fetchget();

    // map.addListener('contextmenu', function (e) {
    //     getlatlLng = getClickLatLng(e.latLng, map);
    // });

    // function getClickLatLng(latLng, map) {

    //     if (cleateMaker != undefined) {
    //         cleateMaker.setMap(null);
    //     }
    //     cleateMaker = new google.maps.Marker({
    //         position: latLng,
    //         map: map,
    //     });
    //     cleateMakerInfo = new google.maps.InfoWindow({
    //         content: '<button type="button" name="gotohere" value="go" onclick="makeload()">ここにいく</button>'
    //     });
    //     currentlatlng = latLng;
    //     cleateMakerInfo.open(map, cleateMaker);
    // };
// };
// setTimeout('delayfunc()', 5000);

// makeload = function () {
//     newgole = currentlatlng;
//     directionsRenderer.setOptions({
//         suppressInfoWindows: true,
//         preserveViewport: false,
//         draggable: true,
//     });
//     directionsRenderer.setMap(map);
//     var request = {
//         origin: cullentposi,
//         destination: newgole,
//         travelMode: 'DRIVING',
//         avoidHighways: true, //高速道路不使用
//     };
//     directionsService.route(request, function (resultgmap, status) {
//         if (status === 'OK') {
//             directionsRenderer.setDirections(resultgmap);
//         } else {
//             console.log(JSON.stringify(resultgmap));
//             alert("取得できませんでした：" + resultgmap + status);
//         }
//     });
//     // var directionsDisplay = new google.maps.DirectionsRenderer();
//     directionsService.route(request, function (response, status) {
//         if (status == google.maps.DirectionsStatus.OK) {
//             directionsRenderer.setDirections(response);
//             currentDirections = directionsRenderer.getDirections();
//             var route = currentDirections.routes[0];
//             distance_for_gole = route.legs[0].distance.text;
//             time_for_gole = route.legs[0].duration.text;
//             document.getElementById("distance_card").setAttribute("style", "display:block;");
//             document.getElementById("dis_time_card").setAttribute("style", "display:block;");
//             document.getElementById("distance").innerHTML = route.legs[0].distance.text;
//             document.getElementById("dis_time").innerHTML = route.legs[0].duration.text;
//         }
//     });
//     google.maps.event.addListener(directionsRenderer,
//         'directions_changed',
//         function () {
//             computeTotalDistance(directionsRenderer.directions);
//         });
//     let computeTotalDistance = function (res) {
//         let newres = res.routes[0].legs[0];
//         document.getElementById("distance").innerText = newres.distance.text;
//         document.getElementById("dis_time").innerText = newres.duration.text;
//     };
// };