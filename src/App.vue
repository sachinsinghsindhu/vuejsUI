<template>
  <div id="app">
    <TableComp></TableComp>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import TableComp from './components/tableComponent';
import {data} from './data';

export default {
  name: 'app',
  components: {
    HelloWorld,
    TableComp,
  },
  data() {
    return {
      tableData: null,
    }
  },
  created() {
    console.log(data);
    this.tableData = data;
    console.log(this.tableData);
  },
  mounted() {
    
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
