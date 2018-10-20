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
      <button v-on:click="clickMainButton()" v-bind:class="{mainButton:true, mainButtonClickable:mainButtonClickable, mainButtonDisabled:!mainButtonClickable}" v-bind:disabled="!mainButtonClickable">{{buttonText}}</button>
    </p>
  </div>
</template>

<script>
    import Die from "./Die";
    import DieState from "../DieState"
    export default {
        name: "PlayBox",
        props: [ "gameOver", "winners", "winningScore", "playerNames", "currentPlayer", "diceData", "clickDie", "clickMainButton" ],
        components: {Die},
        data: function() {
            return {
                mainButtonClickable: true
            }
        },
        computed: {
            winnersString: function() {
                let winnerStr = "";
                if ( this.winners.length <= 0 ) {
                    return "No one wins!";
                } else if ( this.winners.length === 1 ) {
                    winnerStr += this.playerNames[ this.winners[0] ]+" wins";
                } else if ( this.winners.length === 2 ) {
                  winnerStr += this.playerNames[ this.winners[0] ]+" and "+this.playerNames[ this.winners[1] ]+" win";
                } else {
                    let winnersStr = "";
                    for ( let i=0; i<this.winners.length-1; i++ ) {
                        winnersStr += this.playerNames[ this.winners[i] ]+", ";
                    }
                    winnersStr += "and "+this.playerNames[ this.winners[this.winners.length-1] ]+" win";
                    winnerStr += winnersStr;
                }
                winnerStr += ", with the lowest score of "+this.winningScore+".";
                return winnerStr;
            },
            buttonText: function() {
                let notYetRolled = false;
                let numToKeep = 0;
                let numToRoll = 0;
                let numLocked = 0;
                if ( this.gameOver ) {
                    this.mainButtonClickable = true;
                    return "New game";
                }
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
                if ( notYetRolled ) {
                    this.mainButtonClickable = true;
                    return "Roll all dice";
                }
                if ( numLocked === this.diceData.length ) {
                    this.mainButtonClickable = true;
                    return "Next turn";
                }
                if ( numToKeep < 1 ) {
                    this.mainButtonClickable = false;
                    return "Please choose at least 1 die to keep." }
                if ( numToKeep === this.diceData.length ) {
                    this.mainButtonClickable = true;
                    return "Keep all "+this.diceData.length+" dice";
                }
                this.mainButtonClickable = true;
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
.mainButtonClickable {
  /*background-color: #42b983;*/
}
.mainButtonDisabled {
  /*background-color: coral;*/
}
</style>
