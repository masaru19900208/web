<template>
  <div class="row mx-2">
    <data-card-comp dataName="外部給電電力" idTagName="outPowerTab" idMainName="outPower" v-if="issuppPower"> {{pwsplw_f}} </data-card-comp>
    <data-card-comp dataName="外部給電可能時間" idTagName="outPowerTimeTag" idMainName="outPowerTime" v-if="issuppTime"> {{pwsplt_f}} </data-card-comp>
    <data-card-comp dataName="水素残量" idTagName="remaHydrogenTag" idMainName="remaHydrogen" v-if="isremaHydrogen"> {{fuelh2}} </data-card-comp>
    <data-card-comp dataName="車速" idTagName="spdTag" idMainName="spd" v-if="isspd"> {{sp1}} </data-card-comp>
    <data-card-comp dataName="FC電圧"  idTagName="voltageTag" idMainName="voltage" v-if="isvoltage"> {{currentlat}} </data-card-comp>
    <data-card-comp dataName="FC電流" idTagName="currentTag" idMainName="current" v-if="iscurrent"> {{currentlon}} </data-card-comp>
    <data-card-comp dataName="バッテリSoC" idTagName="battSOCTag" idMainName="battSOC" v-if="isbattSOC"> {{TTL}} </data-card-comp>
    <data-card-comp dataName="航続可能距離" idTagName="cruisRangTag" idMainName="cruisRang" v-if="iscruisRang"></data-card-comp>
    <data-card-comp dataName="FC水温" idTagName="thwfoTag" idMainName="thwfo" v-if="isthwfo"></data-card-comp>
    <data-card-comp dataName="外気温" idTagName="outTempTag" idMainName="outTemp" v-if="isoutTemp"></data-card-comp>
    <data-card-comp dataName="車内温" idTagName="tempInCarTag" idMainName="tempInCar" v-if="iscartemp"> {{outtmp}} </data-card-comp>
    <!-- <button @click="getaws">getaws</button> -->
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
              外部給電
              <ul class="list-group">

                  <setting-win cardTitle="給電電力" @label-data="isShow" inputID="issuppPower" ischeck=true></setting-win>
                  <setting-win cardTitle="給電残時間" @label-data="isShow" inputID="issuppTime" ischeck=true></setting-win>

              </ul>
            </li>

            <li class="list-group-item">
              車両情報
              <ul class="list-group">

                <setting-win cardTitle="水素残量" @label-data="isShow" inputID="isremaHydrogen" ischeck=true></setting-win>
                <setting-win cardTitle="車速" @label-data="isShow" inputID="isspd"></setting-win>
                <setting-win cardTitle="FC電圧" @label-data="isShow" inputID="isvoltage"></setting-win>
                <setting-win cardTitle="FC電流" @label-data="isShow" inputID="iscurrent" ischeck=true></setting-win>
                <setting-win cardTitle="バッテリ" @label-data="isShow" inputID="isbattSOC"></setting-win>
                <setting-win cardTitle="航続可能距離" @label-data="isShow" inputID="iscruisRang"></setting-win>
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
              地図設定
              <ul class="list-group">

                <setting-win cardTitle="車両追跡" inputID="isTracking" ischeck=true></setting-win>

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
import getaws from '../public/js/getaws'

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
      result: 0,
      currentlat: 0,
      currentlon: 0,
      datetime: 0,
      fuelh2: 0,
      dcpsplst: 0,
      pwsplt_f: 0,
      pwsplw_f: 0,
      sp1: 0,
      outtmp: 0,
      TTL: 0,
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
    },
    getaws() {
      console.log("button dami getaws")
    },
  },
  mounted(){
    setInterval(() => {
      getaws.getawsdata()
      this.currentlat = getaws.data.currentlat
      this.currentlon = getaws.data.currentlon
      this.datetime = getaws.data.datetime
      this.fuelh2 = getaws.data.fuelh2
      this.dcpsplst = getaws.data.dcpsplst
      this.pwsplt_f = getaws.data.pwsplt_f
      this.pwsplw_f = getaws.data.pwsplw_f
      this.sp1 = getaws.data.sp1
      this.outtmp = getaws.data.outtmp
      this.TTL = getaws.data.TTL

    }, 5000);
    let self = this
    async function firstMakeDataCard(){
          const res = await getaws.asyncFunc()
          const json = await res.json()
            //データを初期設定
            self.currentlat = json.Items[0].ido
            self.currentlon = json.Items[0].keido
            self.datetime = json.Items[0].datetime;
            self.fuelh2 = json.Items[0].fuelh2;
            self.dcpsplst = json.Items[0].dcpsplst;
            self.pwsplt_f = json.Items[0].pwsplt_f;
            self.pwsplw_f = json.Items[0].pwsplw_f;
            self.sp1 = json.Items[0].sp1;
            self.outtmp = json.Items[0].outtmp;
            self.TTL = json.Items[0].TTL;
            
            getaws.data.currentlat = json.Items[0].ido
            getaws.data.currentlon = json.Items[0].keido
            getaws.data.datetime = json.Items[0].datetime;
            getaws.data.fuelh2 = json.Items[0].fuelh2;
            getaws.data.dcpsplst = json.Items[0].dcpsplst;
            getaws.data.pwsplt_f = json.Items[0].pwsplt_f;
            getaws.data.pwsplw_f = json.Items[0].pwsplw_f;
            getaws.data.sp1 = json.Items[0].sp1;
            getaws.data.outtmp = json.Items[0].outtmp;
            getaws.data.TTL = json.Items[0].TTL
    }
    firstMakeDataCard()
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
