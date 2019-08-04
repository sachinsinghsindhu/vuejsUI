<template>
<div class="container" >
  <div class="table-container">
    <div class="header row">
        <div class="col" v-for="def in options.colDefs" :key="def.label" :style="{width: def.width}">{{def.label}}</div>
    </div>
    <transition-group name="show" >
      <div class="row" v-for="(row,index) in options.data" :key="row.id" :id="row.id">
          <div class="col" v-for="(col,idx) in row.colData" :style="{width: options.colDefs[idx].width}">
              <input type="text"  v-if="options.colDefs[idx].type == 'input'" v-model="options.data[index].colData[idx]">
              <div v-else-if="options.colDefs[idx].type == 'text'">{{col}}</div>
              <input type="checkbox" v-else-if="options.colDefs[idx].type == 'checkbox'"  v-model="options.data[index].colData[idx]">
          </div>
      </div>
    </transition-group>
    
  </div>
  <div class="btns">
    <button v-on:click="showAddRowsModel">Add Rows</button>
    <button v-on:click="showUpdateRowsModel">Update Rows</button>
    <button v-on:click="deleteCheckedRows">delete checked row</button>
  </div>
  <transition name="show">
    <addRowsComp v-if="showAddRowsComp"
      :colDefs="options.colDefs"
      :funcOfComp="addOrUpdateRow"
      :rowData="options.data"
      @addOrUpdate="add_update_function"
    ></addRowsComp>
  </transition>
</div>
</template>

<script>
import { data } from '../data';
import addRowsComp from './addRowsComp';
export default {
  props: {
  },
  components: {
    addRowsComp,
  },
  data() {
    return {
      options: null,
      showAddRowsComp: false,
      addOrUpdateRow: '',
    }
  },
  created() {
    console.log(data);
    this.options = data;
  },
  computed: {
    getStyle(def) {
      return {
        width: def.width,
      }
    }
  },
  methods: {
    showAddRowsModel() {
      this.addOrUpdateRow = 'addRows';
      this.showAddRowsComp = true;
    },
    
    showUpdateRowsModel() {
      this.addOrUpdateRow = 'updateRows';
      this.showAddRowsComp = true;
    },
    add_update_function(payload) {
      if (this.addOrUpdateRow == 'addRows') {
        this.options.data = this.options.data.concat(payload);
      } else if (this.addOrUpdateRow == 'updateRows') {
        console.log("-------------->updateRows ",payload);
        let toBeUpdatedRowIdArr = [];
        let toBeUpdatedRowDataArr = [];
        payload.forEach((row) => {
          toBeUpdatedRowIdArr.push(row.id);
          toBeUpdatedRowDataArr.push(row.colData);
        });
        console.log(toBeUpdatedRowIdArr,toBeUpdatedRowDataArr);
        this.options.data.forEach((row,indx) => {
          const currRowIdx = toBeUpdatedRowIdArr.indexOf(row.id);
          if (currRowIdx != -1) {
            this.options.data[indx].colData = toBeUpdatedRowDataArr[currRowIdx];
          }
        });
      }
      this.showAddRowsComp = false;
    },
    deleteCheckedRows() {
      console.log('deleteCheckedRows');
      let rowIdArr = [];
      let indexOfCheckColumn;
      this.options.colDefs.forEach((colDef,idx) => {
        if (colDef.label === 'Check to delete') indexOfCheckColumn = idx;
      });
      this.options.data.forEach(row => {
        if (row.colData[indexOfCheckColumn] === true) rowIdArr.push(row.id);
      });
      console.log(rowIdArr);
      this.deleteRows(rowIdArr);
    },
    deleteRows(rowIdArr) {
      this.options.data = this.options.data.filter((row)=> {
        return rowIdArr.indexOf(row.id) == -1;
      });
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 100vw;
}
.table-container {
    position: relative;
    width: 75%;
    left: 12.5%;
    background: white;
    font-family: Verdana, Geneva, sans-serif;
    overflow-x: scroll;
}
.row{
    /* position: relative; */
    white-space: nowrap;
    display: table-row;
    width: auto;
    height: 50px;
    background-color: rgb(250,250,250);
    transition: all 0.8s ease-in-out;
}
.row:nth-child(even) {
  background: white;
}
.header {
    background-color: rgb(23,162,184);
    color: white;
    font-size: 18px;
}
.col {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 50px;
}
.show-enter,.show-leave-to {
  opacity: 0;
}
.show-enter-to,.show-leave {
  opacity: 1;
}
.show-enter-active,.show-leave-active {
  transition: all 1.5s ease-in-out;
}
.btns {
  width: 75%;
  position: relative;
  left: 12.5%;
  height: auto;
  min-height: 50px;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding-left: 20px;
  padding-right: 20px;
  background: rgb(250,250,250);
}
button {
  background: rgb(0,123,255);
  /* border-radius:  */
  color: white;
  min-height: 20px;
  height: auto;
  font-size: 16px;
  padding: 5px;
}
</style>
