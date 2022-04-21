<template>
  <!-- <h2>何でー</h2> -->
  <div class="row mx-2">
    <data-card-comp dataName="FC電圧" unit="V" idTagName="voltageTag" idMainName="voltage" v-if="isvoltage"></data-card-comp>
    <data-card-comp dataName="車速" unit="km/h" idTagName="spdTag" idMainName="spd" v-if="isspd"></data-card-comp>
    <data-card-comp dataName="外部給電電力" unit="kW" idTagName="outPowerTab" idMainName="outPower" v-if="issuppPower"></data-card-comp>
    <data-card-comp dataName="外部給電可能時間" unit="Hr" idTagName="outPowerTimeTag" idMainName="outPowerTime" v-if="issuppTime"></data-card-comp>
    <data-card-comp dataName="FC電流" unit="A" idTagName="currentTag" idMainName="current" v-if="iscurrent"></data-card-comp>
    <data-card-comp dataName="水素残量" unit="%" idTagName="remaHydrogenTag" idMainName="remaHydrogen" v-if="isremaHydrogen"></data-card-comp>
    <data-card-comp dataName="外気温" unit="℃" idTagName="outTempTag" idMainName="outTemp" v-if="isoutTemp"></data-card-comp>
    <data-card-comp dataName="航続可能距離" unit="km" idTagName="cruisRangTag" idMainName="cruisRang" v-if="iscruisRang"></data-card-comp>
    <data-card-comp dataName="バッテリSoC" unit="%" idTagName="battSOCTag" idMainName="battSOC" v-if="isbattSOC"></data-card-comp>
    <data-card-comp dataName="FC水温" unit="℃" idTagName="thwfoTag" idMainName="thwfo" v-if="isthwfo"></data-card-comp>
    <data-card-comp dataName="車内温" unit="℃" idTagName="tempInCarTag" idMainName="tempInCar" v-if="iscartemp"></data-card-comp>
  </div>


  <div class="modal fade" id="settingModal" tabindex="-1" aria-labelledby="settingModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-md modal-sm-md">
      <div class="modal-content w-75 w-100-md">
        <div class="modal-header">
          <h5 class="modal-title" id="settingModalLabel">表示項目の選択</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <ul class="list-group list-group-flush">

            <li class="list-group-item">
              車両情報
              <ul class="list-group">

                <setting-win cardTitle="FC電圧" @label-data="isShow" inputID="isvoltage"></setting-win>
                <setting-win cardTitle="FC電流" @label-data="isShow" inputID="iscurrent" ischeck=true></setting-win>
                <setting-win cardTitle="車速" @label-data="isShow" inputID="isspd"></setting-win>
                <setting-win cardTitle="水素残量" @label-data="isShow" inputID="isremaHydrogen" ischeck=true></setting-win>
                <setting-win cardTitle="航続可能距離" @label-data="isShow" inputID="iscruisRang"></setting-win>
                <setting-win cardTitle="バッテリ" @label-data="isShow" inputID="isbattSOC"></setting-win>
                <setting-win cardTitle="FC水温" @label-data="isShow" inputID="isthwfo"></setting-win>

              </ul>
            </li>

            <li class="list-group-item">
              温度情報
              <ul class="list-group">

                <setting-win cardTitle="外気温" @label-data="isShow" inputID="isoutTemp" ischeck=true></setting-win>
                <setting-win cardTitle="車内温" @label-data="isShow" inputID="iscartemp"></setting-win>

              </ul>
            </li>

            <li class="list-group-item">
              外部給電
              <ul class="list-group">

                  <setting-win cardTitle="給電電力" @label-data="isShow" inputID="issuppPower" ischeck=true></setting-win>
                  <setting-win cardTitle="給電残時間" @label-data="isShow" inputID="issuppTime" ischeck=true></setting-win>

              </ul>
            </li>

            <li class="list-group-item">
              地図設定
              <ul class="list-group">

                <setting-win cardTitle="車両追跡"></setting-win>

              </ul>
            </li>

            <li class="list-group-item">
              情報縮小版
              <ul class="list-group">

                <li class="list-group-item">
                  <a target="_blank" rel="noopener noreferrer" href="#"> dami- </a>
                </li>
              </ul>

            </li>
          </ul>

        </div>
        <div class="modal-footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import dataCardComp from "./components/dataCardComp.vue";
import settingWin from "./components/settingWin.vue"
// import SettingFunc from './settingFunc.vue';

export default {
  name: "MyBppTest",
  components: {
    dataCardComp,
    settingWin,
    // SettingFunc
  },
  data() {
    return {
      isvoltage: false,
      iscurrent: true,
      isspd: false,
      isremaHydrogen: true,
      iscruisRang: false,
      isbattSOC: false,
      isthwfo: false,
      isoutTemp: true,
      iscartemp: false,
      issuppPower: true,
      issuppTime: true,
    };
  },
  methods:{
    isShow(value){
      if(value.inputID == "isvoltage")
        this.isvoltage = !this.isvoltage;
      else if(value.inputID == "iscurrent")
        this.iscurrent = !this.iscurrent;
      else if(value.inputID == "isspd")
        this.isspd = !this.isspd;
      else if(value.inputID == "isremaHydrogen")
        this.isremaHydrogen = !this.isremaHydrogen;
      else if(value.inputID == "iscruisRang")
        this.iscruisRang = !this.iscruisRang;
      else if(value.inputID == "isbattSOC")
        this.isbattSOC = !this.isbattSOC;
      else if(value.inputID == "isthwfo")
        this.isthwfo = !this.isthwfo;
      else if(value.inputID == "isoutTemp")
        this.isoutTemp = !this.isoutTemp;
      else if(value.inputID == "iscartemp")
        this.iscartemp = !this.iscartemp;
      else if(value.inputID == "issuppPower")
        this.issuppPower = !this.issuppPower;
      else if(value.inputID == "issuppTime")
        this.issuppTime = !this.issuppTime;
    }
  }
};
</script>

<style>
#bpp {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
.disInline{
  display:inline
}
.antiFlo{
  float:none !important
}
</style>
