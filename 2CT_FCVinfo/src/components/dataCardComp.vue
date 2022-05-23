<template>
  <div class="col-md-3 col-6 my-2 px-2"  :id="idTagName">
    <div class="card">
      <div class="card-header">
        <span class="is-medium"><i class="fas fa-lg fa-bolt mx-1"></i></span>
        {{ dataName }}
      </div>
      <div class="card-body">
        <h4 class="card-title" :id="idMainName"><slot></slot></h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dataCardComp",
  props: {
    dataName: String,
    unit: String,
    idTagName: String,
    idMainName: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
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
}
</style>
