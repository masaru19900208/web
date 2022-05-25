<template>
<div style="position: relative;">
  <div id="spin" class="d-flex justify-content-center align-items-center" v-if="showload" @click="showload = !showload">
      <div class="spinner-border text-primary" role="status" style="width: 5rem; height: 5rem;">
        <span class="visually-hidden"></span>
      </div>
  </div>
  <div id="gmap" class="d-flex align-items-center" style="height:50vh; z-index: 1; position: relative;"></div>
</div>
</template>

<script>
import getaws from './assets/getaws'

export default {
  name: "v_gmap",
  // components: {
  //   getaws,
  // },
  data(){
    return{
      currentlat: 0,
      currentlon: 0,
      showload : true,
      // cullentposi: 0,
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
    // let self = this;
    scriptEl.setAttribute('src', `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GMAPKEY}&language=ja`)
    document.head.appendChild(scriptEl)
    window.onload = () => {
      (() => {
        // ログインしていない場合リダイレクト
        const params = new URLSearchParams(location.search.slice(1));
        if (!params.has('code')) {
          return location.href = "https://masarutest001.auth.ap-northeast-1.amazoncognito.com/login?client_id=6s0ek26ks3a8ggrn6l9mtqardo&response_type=code&scope=openid&redirect_uri=https://evecamoni2ct.de"
        }

        // function testAsync(){
        //   return new Promise((resolve)=>{
        //     getaws.getawsdata()
        //     self.currentlat = getaws.data.currentlat
        //     self.currentlon = getaws.data.currentlon
        //     console.log("resolve")
        //     console.log(self.currentlat)
        //     resolve()
        //   });
        // }
        async function callerFun(){
            console.log("Caller");
            const res = await getaws.asynctest()
            const json = await res.json()
            console.log(json)
            console.log("After waiting");
        }
        callerFun();


        // 地図を生成して表示
        map = new window.google.maps.Map(document.getElementById("gmap"), {
          zoom: 15,
          center: new window.google.maps.LatLng(0, 0),
          mapTypeId: "roadmap"
        });
        new window.google.maps.DirectionsService();
        new window.google.maps.DirectionsRenderer();

        cullentposi = new window.google.maps.LatLng(this.currentlat, this.currentlon);
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
        // gettest()
        // getaws.getawsdata()



      })()
    }
    setInterval(() => {
      getaws.getawsdata()
      this.currentlat = getaws.data.currentlat
      this.currentlon = getaws.data.currentlon
      // console.log(this.currentlat)


      cullentposi = new window.google.maps.LatLng(this.currentlat, this.currentlon);
      var Carinitmarker = {
        position: cullentposi,
        map: map,
        icon: {
          url: require('./assets/img/car_point.svg'),
          scaledSize: new window.google.maps.Size(40, 33) //サイズ
        },
      };

      Carposi.setMap(null);
      // let elem_map_cont = document.getElementById("map_center");
      // if (elem_map_cont.checked) {
      map.setCenter(cullentposi); //センター合わせ
      // }
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
