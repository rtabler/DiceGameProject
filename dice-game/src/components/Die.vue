<template>
  <button v-on:click="clickDie(dieIndex)" v-bind:class="{die:true}" v-bind:style="styleObject">
    <img v-bind:class="{dieImg:true}" :src="imgFilename">
  </button>
</template>

<script>
    import DieState from "../DieState"

    export default {
        name: "Die",
        props: [ "dieData", "dieIndex", "clickDie" ],
        data: function() {
            return {
            }
        },
        computed: {
            styleObject: function() {
                let colorStr = 'white';
                if ( this.dieData.dieState === DieState.locked ) { colorStr = 'grey'; }
                else if ( this.dieData.dieState === DieState.willLock ) { colorStr = 'red'; }
                else if ( this.dieData.dieState === DieState.unlocked ) { colorStr = 'lime'; }
                return {
                    backgroundColor: colorStr
                }
            },
            imgFilename: function() {
                let c = '';
                if ( this.dieData.dieNumber === null ) { c = '_'; }
                else if ( this.dieData.dieNumber === 1 ) { c = '1'; }
                else if ( this.dieData.dieNumber === 2 ) { c = '2'; }
                else if ( this.dieData.dieNumber === 3 ) { c = '3'; }
                else if ( this.dieData.dieNumber === 4 ) { c = '4o'; }
                else if ( this.dieData.dieNumber === 5 ) { c = '5'; }
                else if ( this.dieData.dieNumber === 6 ) { c = '6'; }
                return require( "../assets/dice"+c+".svg" );
            }
        },
        methods: {
        }
    }
</script>

<style scoped>
.die {
  background-color: pink;
  display: inline-block;
  width: 64px;
  height: 64px;
  margin: 5px;
}
.dieImg {
  margin: 3px;
}
</style>
