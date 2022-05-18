import { createApp } from 'vue'
// import App from './App.vue'
import MyBppTest from './MyBpp.vue'
import v_gmap from './gmap.vue'
import v_chart from './chart.vue'

// createApp(App).mount('#app')
createApp(MyBppTest).mount("#bpp")
createApp(v_gmap).mount("#v-gmap")
createApp(v_chart).mount("#v-chart")
// createApp(settingWinFunc).mount("#settingFunc")