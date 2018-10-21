<template>
  <button v-on:click="clickDie(dieIndex)" :disabled="dieNotYetRolled || dieLocked" :class="{die:true, dieLocked:dieLocked, dieWillLock:dieWillLock, dieUnlocked:dieUnlocked}">
    <img :class="['dieImg']" :src="imgFilename">
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
            dieLocked: function() { return this.dieData.dieState === DieState.locked; },
            dieWillLock: function() { return this.dieData.dieState === DieState.willLock; },
            dieUnlocked: function() { return this.dieData.dieState === DieState.unlocked; },
            dieNotYetRolled: function() { return this.dieData.dieState === DieState.notYetRolled; },
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
  background-color: transparent;
  display: inline-block;
  margin: 5px;
  border-width: 0px;
  border-radius: 13px;
  width: 60px;
  height: 60px;
  padding: 0px;
}
.dieLocked {
  background-color: grey;
}
.dieWillLock {
  background-color: red;
}
.dieUnlocked {
  background-color: lime;
}
.dieImg {
  margin: 4px;
}
</style>
