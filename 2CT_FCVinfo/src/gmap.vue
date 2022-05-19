<template>
  <div id="gmap" class="d-flex align-items-center" style="height:50vh;"></div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "v_gmap",
  // components: {
  //   HelloWorld,
  // },
  data(){
    return{
      childdata : 0
    }
  },
  methods:{
    ugoku(){
      console.log(this.childdata)
    },
  },
  mounted() {
    let scriptEl = document.createElement('script')
    scriptEl.setAttribute('src', `https://maps.googleapis.com/maps/api/js?key=${process.env.VUE_APP_GMAPKEY}&language=ja`)
    document.head.appendChild(scriptEl)
    window.onload = () => {
      (() => {
        // ログインしていない場合リダイレクト
        const params = new URLSearchParams(location.search.slice(1));
        if (!params.has('code')) {
          return location.href = "https://masarutest001.auth.ap-northeast-1.amazoncognito.com/login?client_id=6s0ek26ks3a8ggrn6l9mtqardo&response_type=code&scope=openid&redirect_uri=https://evecamoni2ct.de"
        }

        // 地図を生成して表示
        new window.google.maps.Map(document.getElementById("gmap"), {
          zoom: 15,
          center: new window.google.maps.LatLng(35.2288635, 138.9058909),
          mapTypeId: "roadmap"
        });
        new window.google.maps.DirectionsService();
        new window.google.maps.DirectionsRenderer();

      })()
    }
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
</style>
