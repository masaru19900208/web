<template>
  <div id="gmap" class="d-flex align-items-center" style="height:50vh; z-index: 1; position: relative;"></div>
  <p> Hello {{username}} san</p>
</template>

<script>
import getaws from '../public/js/getaws'
import getCognito from '../public/js/getCognito'

export default {
  name: "v_gmap",
  // components: {
  //   getaws,
  // },
  data(){
    return{
      currentlat: 0,
      currentlon: 0,
      username:localStorage.username
    }
  },
  methods:{
    ugoku(){
      console.log(this.childdata)
    },
  },
  mounted() {
    let map;
    let cullentposi;
    let Carposi;
    let scriptEl = document.createElement('script')
    let scriptEl2 = document.createElement('script')
    scriptEl.setAttribute('src', `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GMAPKEY}&language=ja`)
    document.head.appendChild(scriptEl)
    scriptEl2.setAttribute('src', `https://unpkg.com/axios/dist/axios.min.js`)
    document.head.appendChild(scriptEl2)
    window.onload = () => {
      (() => {
        // ログインしていない場合リダイレクト
        getCognito.checkSession()

        async function firstMakeMap(){
          const res = await getaws.asyncFunc()
          const json = await res.json()

          // 地図を生成して表示
            map = new window.google.maps.Map(document.getElementById("gmap"), {
            zoom: 15,
            center: new window.google.maps.LatLng(json.Items[0].ido, json.Items[0].keido),
            mapTypeId: "roadmap"
          });
          new window.google.maps.DirectionsService();
          new window.google.maps.DirectionsRenderer();

          cullentposi = new window.google.maps.LatLng(json.Items[0].ido, json.Items[0].keido);
          var Carinitmarker = {
              position: cullentposi,
              map: map,
              icon: {
                  url: require('./assets/img/car_point.svg'),
                  scaledSize: new window.google.maps.Size(40, 30) //サイズ
              },
              animation: window.google.maps.Animation.DROP
          };
          Carposi = new window.google.maps.Marker(Carinitmarker);
        }
       firstMakeMap();
      })()
    }
    setInterval(() => {
      getaws.getawsdata()

      cullentposi = new window.google.maps.LatLng(getaws.data.currentlat, getaws.data.currentlon);
      var Carinitmarker = {
        position: cullentposi,
        map: map,
        icon: {
          url: require('./assets/img/car_point.svg'),
          scaledSize: new window.google.maps.Size(40, 33) //サイズ
        },
      };

      Carposi.setMap(null);
      if(document.getElementById("isTracking").checked){
        map.setCenter(cullentposi); //センター合わせ
      }
      Carposi = new window.google.maps.Marker(Carinitmarker);
    }, 5000);
  }

};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#spin{
  /* display: none; */
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  background: #212529;
  z-index: 2;
}
#spinchild{
  /* color: #fff; */
  z-index: 2;

}
</style>
