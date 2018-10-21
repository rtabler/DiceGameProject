<template>
  <button v-on:click="clickDie(dieIndex)" :disabled="dieNotYetRolled || dieLocked" :class="{die:true, dieLocked:dieLocked, dieWillLock:dieWillLock, dieUnlocked:dieUnlocked}">
    <img :class="['dieImg']" :src="imgFilename">
    <img :class="{dieImg:true, dieImg4o:true, dieImg4oFadeIn:dieIs4o}" :src="img4oFilename"/>
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
            dieIs4o: function() { return this.dieData.dieNumber === 4; },
            imgFilename: function() {
                let c = '';
                if ( this.dieData.dieNumber === null ) { c = '_'; }
                else if ( this.dieData.dieNumber === 1 ) { c = '1'; }
                else if ( this.dieData.dieNumber === 2 ) { c = '2'; }
                else if ( this.dieData.dieNumber === 3 ) { c = '3'; }
                else if ( this.dieData.dieNumber === 4 ) { c = '4'; }
                else if ( this.dieData.dieNumber === 5 ) { c = '5'; }
                else if ( this.dieData.dieNumber === 6 ) { c = '6'; }
                if ( this.dieLocked ) { c += 'g'; }
                return require( "../assets/dice"+c+".svg" );
            },
            img4oFilename: function() {
                let c = '4o';
                if ( this.dieLocked ) { c += 'g'; }
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
  position: relative;
  display: inline-block;
  margin: 8px;
  box-shadow: 0px 0px 4px transparent;
  border-width: 0px;
  border-radius: 13px;
  width: 60px;
  height: 60px;
  padding: 0px;
  cursor: pointer;
  text-align: left;
}
.die:focus {
  outline: 0;
}
.dieLocked {
}
.dieWillLock {
  background-color: grey;
  box-shadow: 3px 3px 4px grey, 3px -3px 4px grey, -3px 3px 4px grey, -3px -3px 4px grey;
}
.dieUnlocked {
  background-color: #ffd053;
  box-shadow: 3px 3px 4px #ffd053, 3px -3px 4px #ffd053, -3px 3px 4px #ffd053, -3px -3px 4px #ffd053;
}
.dieImg {
  position: absolute;
  top: 0;
  margin: 0 auto;
  width: 60px;
}
.dieImg4o {
  opacity: 0;
  user-select: none;
  -webkit-user-drag: none;
}
.dieImg4oFadeIn {
  opacity: 1;
  transition: opacity 1500ms;
  transition-delay: 300ms;
}
</style>
