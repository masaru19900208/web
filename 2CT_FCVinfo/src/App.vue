<template>
  <!-- <HelloWorld msg="This is My Vue 3 " /> -->
  <hello-world @my-send="ugoku"> {{childdata}} </hello-world>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  data(){
    return{
      childdata : 10
    }
  },
  methods:{
    ugoku(value){
      this.childdata = value
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
