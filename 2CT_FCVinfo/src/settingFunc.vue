<template>
  <setting-win></setting-win>
</template>

<script>
import settingWin from "./components/settingWin.vue";

export default {
  name: "settingWinFunc",
  components: {
    settingWin,
  },
  data() {
    return {
      dami: "ダミー",
    };
  },
};
</script>

<style>
/* #bpp {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
