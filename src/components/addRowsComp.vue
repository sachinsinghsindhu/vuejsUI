<template>
<div class="dim-layer">
  <div class="container">
    <div class="addrows-container">
        <div class="header row">
            <div class="col">Row Id</div>
            <div class="col" v-for="def in colDefs" :key="def.label" :style="{width: def.width}">{{def.label}}</div>
        </div>
        <div class="row">
            <div class="col" v-if="funcOfComp == 'addRows'">
                <input type="text" v-model="rowId">
            </div>
            <div class="col" v-if="funcOfComp == 'updateRows'">
                <select v-model="rowId" >
                    <option v-for="(row) in rowData" v-bind:value="row.id" :key="row.id">
                        {{ row.id }}
                    </option>
                </select>
            </div>
            <div class="col" v-for="(col, indx) in colDefs" :style="{width: col.width}">
                <input type="text"  v-if="col.type == 'input' || col.type == 'text'" v-model="addColData[indx]" value="default text">
                <!-- <div v-else-if="colDefs[indx].type == 'text'">{{col}}</div> -->
                <input type="checkbox" v-else-if="col.type == 'checkbox'" :checked="true" v-model="addColData[indx]">
            </div>
        </div>
    </div>
    <div class="btns">
        <button v-on:click="add_or_update">Done</button>
        <div> Number of rows {{funcOfComp == 'addRows' ? 'to be added' : ' to be updated'}} : {{this.addRowsArr.length}}</div>
        <button v-on:click="save">Save This Row</button>
    </div>
  </div>
</div>
</template>

<script>
import { Stream } from 'stream';
export default {
  props: {
      colDefs: {
          type: Array,
          required: true,
      },
      funcOfComp: {
          type: String,
          required: true,
      },
      rowData: {
          type: Array,
      }
      
  },
  data() {
    return {
      rowId: '',
      addRowsArr: [],
      addColData: [],
      defaultColumnValue: [],
    }
  },
  created() {
  },
  mounted() {
    console.log("mounted",this.colDefs);
    this.colDefs.forEach(colDef => {
      if (colDef.type == 'input' || colDef.type == 'text') this.defaultColumnValue.push('default text');
      else if (colDef.type == 'checkbox') this.defaultColumnValue.push(false);
    });
    this.addColData = this.defaultColumnValue.slice();
  },
  computed: {
  },
  methods: {
    save() {
        if (!this.rowId) return;
        this.addRowsArr.push({
            id: this.rowId,
            colData: this.addColData,
        });
        this.rowId = '';
        this.addColData = this.defaultColumnValue.slice();
    },
    add_or_update() {
      this.$emit('addOrUpdate', this.addRowsArr);
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dim-layer {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.8);
}
.container {
  position: absolute;
  top: 25%;
  width: 75%;
  left: 12.5%;
}
.addrows-container {
    position: relative;
    /* top: 25%;
    width: 75%;
    left: 12.5%; */
    background: white;
    font-family: Verdana, Geneva, sans-serif;
    overflow: auto;
}
.row{
    position: relative;
    width: auto;
    display: table-row;
    white-space: nowrap;
    /* flex-direction: row;
    justify-content: center;
    align-items: center; */
    height: 50px;
    /* height: auto; */
    background: rgb(250,250,250);
    transition: all 0.8s ease-in-out;
}
.row:nth-child(even) {
  background: white;
}
.header {
    /* height: auto; */
    background: rgb(23,162,184);
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
  /* width: 75%;
  left: 12.5%; */
  /* height: auto; */
  height: 50px;
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
