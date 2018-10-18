<template>
  <div v-bind:class="{playBox:true}">
    <h3>{{currentPlayerName}}'s turn</h3>
    <div>
      <Die v-for="(dieData,dieIndex) in diceData" :clickDie="clickDie" :dieData="dieData" :dieIndex="dieIndex"></Die>
    </div>
    <p>
      <button v-on:click="clickMainButton()">{{buttonText}}</button>
    </p>
  </div>
</template>

<script>
    import Die from "./Die";
    import DieState from "../DieState"
    export default {
        name: "PlayBox",
        props: [ "currentPlayerName", "diceData", "clickDie", "clickMainButton" ],
        components: {Die},
        data: function() {
              return {
              }
        },
        computed: {
            buttonText: function() {
                let notYetRolled = false;
                let numToKeep = 0;
                let numToRoll = 0;
                let numLocked = 0;
                for ( let i=0; i<this.diceData.length; i++ ) {
                    let dieState = this.diceData[i].dieState;
                    if ( dieState === DieState.notYetRolled ) {
                        notYetRolled = true;
                        break;
                    } else if ( dieState === DieState.willLock ) {
                        numToKeep++;
                    } else if ( dieState === DieState.unlocked ) {
                        numToRoll++;
                    } else if ( dieState === DieState.locked ) {
                        numLocked++;
                    }
                }
                if ( notYetRolled ) { return "Roll all dice."; }
                if ( numLocked === this.diceData.length ) { return "Next turn."; }
                if ( numToKeep < 1 ) { return "Please choose at least 1 die to keep." }
                return "Keep "+numToKeep+" dice, re-roll "+(numToRoll)+" dice.";
            }
        },
        methods: {
            // rollDice() {
            //     rollDice();
            // }
        }
    }
</script>

<style scoped>
.playBox {
  background-color: lightcyan;
  border: 1px solid black;
  text-align: center;
  width: 500px;
}
</style>
