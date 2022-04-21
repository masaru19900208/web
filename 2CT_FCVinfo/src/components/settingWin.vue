<template>
<li class="list-group-item">
  <div class="custom-control custom-switch">
    <div class="form-check form-switch disInline">
      <input class="form-check-input antiFlo" type="checkbox"  @click="labelbtn" :id="inputID" :checked="ischeck"/>
    </div>
    <label class="custom-control-label" for="voltageTagSwitch"> {{cardTitle}} </label>
  </div>
</li>
  <!-- <button @click="labelbtn">000</button> -->
</template>

<script>
export default {
  name: "settingWin",
  props: {
    dami:String,
    cardTitle:String,
    inputID:String,
    ischeck:String
  },
  data() {
    return {
      isOutPowerTime:true
    };
  },
  methods:{
    labelbtn(){
      // console.log(this.isOutPowerTime);
      this.$emit("label-data",this);
    }
  }
};
</script>

<style scoped>
/* h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
