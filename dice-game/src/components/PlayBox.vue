<template>
  <div v-bind:class="{playBox:true}">
    <div v-if="gameOver">
      <h3>Game over!</h3>
      <p>{{this.winnersString}}</p>
    </div>
    <div v-else>
      <h3>{{playerNames[currentPlayer]}}'s turn</h3>
      <Die v-for="(dieData,dieIndex) in diceData" :clickDie="clickDie" :die-data="dieData" :die-index="dieIndex"></Die>
    </div>
    <p>
      <button v-on:click="clickMainButton()" v-bind:class="{mainButton:true}">{{buttonText}}</button>
    </p>
  </div>
</template>

<script>
    import Die from "./Die";
    import DieState from "../DieState"
    export default {
        name: "PlayBox",
        props: [ "gameOver", "winners", "playerNames", "currentPlayer", "diceData", "clickDie", "clickMainButton" ],
        components: {Die},
        data: function() {
              return {
              }
        },
        computed: {
            winnersString: function() {
                if ( this.winners.length <= 0 ) {
                    return "No one wins!";
                } else if ( this.winners.length === 1 ) {
                    return this.playerNames[ this.winners[0] ]+" wins!";
                } else if ( this.winners.length === 2 ) {
                    return this.playerNames[ this.winners[0] ]+" and "+this.playerNames[ this.winners[1] ]+" win!";
                } else {
                    let winnersStr = "";
                    for ( let i=0; i<this.winners.length-1; i++ ) {
                        winnersStr += this.playerNames[ this.winners[i] ]+", ";
                    }
                    winnersStr += "and "+this.playerNames[ this.winners[this.winners.length-1] ]+" win!";
                    return winnersStr;
                }
            },
            buttonText: function() {
                let notYetRolled = false;
                let numToKeep = 0;
                let numToRoll = 0;
                let numLocked = 0;
                if ( this.gameOver ) { return "New game"; }
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
                if ( notYetRolled ) { return "Roll all dice"; }
                if ( numLocked === this.diceData.length ) { return "Next turn"; }
                if ( numToKeep < 1 ) { return "Please choose at least 1 die to keep." }
                if ( numToKeep === this.diceData.length ) { return "Keep all "+this.diceData.length+" dice"; }
                return "Keep "+numToKeep+" dice, re-roll "+(numToRoll)+" dice";
            }
        },
        methods: {
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
.mainButton {
  width: 300px;
  height: 50px;
  font-size: 1em;
}
</style>
