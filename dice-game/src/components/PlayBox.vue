<template>
  <div :class="['playBox']">
    <div v-if="gameOver">
      <h3>Game over!</h3>
      <p>{{winnersString(this.winners)}}, with the lowest total score of {{winningScore}}!</p>
    </div>
    <div v-else-if="betweenRounds">
      <h3>{{winnersString(this.roundWinners[this.roundWinners.length-1])}} Round {{currentRound+1-1}}.</h3>
      <p>{{playerNames[currentPlayer]}} starts the next round.</p>
    </div>
    <div v-else>
      <h3>{{playerNames[currentPlayer]}}'s turn:</h3>
      <Die v-for="(dieData,dieIndex) in diceData" :key="dieIndex" :clickDie="clickDie" :die-data="dieData" :die-index="dieIndex"></Die>
    </div>
    <p>
      <button v-on:click="clickMainButton()"
              :class="['mainButton']" :disabled="!mainButtonClickable">{{getButtonText()}}</button>
    </p>
  </div>
</template>

<script>
    import Die from "./Die";
    import DieState from "../DieState"
    export default {
        name: "PlayBox",
        props: [ "gameOver", "winners", "winningScore", "betweenRounds", "roundWinners", "currentRound",
                "playerNames", "currentPlayer", "diceData", "clickDie", "clickMainButton" ],
        components: {Die},
        data: function() {
            return {
                mainButtonClickable: true
            }
        },
        methods: {
            getButtonText: function() {
                let notYetRolled = false;
                let numToKeep = 0;
                let numToRoll = 0;
                let numLocked = 0;
                if ( this.gameOver ) {
                    this.mainButtonClickable = true;
                    return "New game";
                }
                if ( this.betweenRounds ) {
                    this.mainButtonClickable = true;
                    return "Next round";
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
                    return "Please choose at least 1 die to keep."
                }
                if ( numToKeep === this.diceData.length ) {
                    this.mainButtonClickable = true;
                    return "Keep all "+this.diceData.length+" dice";
                }
                this.mainButtonClickable = true;
                return "Keep "+numToKeep+" dice"+(numToRoll>0 ? ", re-roll "+(numToRoll)+" dice" : "");
            },
            winnersString: function( winnersArray ) {
                let winnerStr = "";
                if ( winnersArray.length <= 0 ) {
                    return "No one wins!";
                } else if ( winnersArray.length === 1 ) {
                    winnerStr += this.playerNames[ winnersArray[0] ]+" wins";
                } else if ( winnersArray.length === 2 ) {
                    winnerStr += this.playerNames[ winnersArray[0] ]+" and "+this.playerNames[ winnersArray[1] ]+" win";
                } else {
                    let winnersStr = "";
                    for ( let i=0; i<winnersArray.length-1; i++ ) {
                        winnersStr += this.playerNames[ winnersArray[i] ]+", ";
                    }
                    winnersStr += "and "+this.playerNames[ winnersArray[winnersArray.length-1] ]+" win";
                    winnerStr += winnersStr;
                }
                return winnerStr;
            }
        }
    }
</script>

<style scoped>
.playBox {
  background-color: #c6e1ff;
  border: 1px solid black;
  text-align: center;
  width: 500px;
}
.mainButton {
  width: 340px;
  height: 50px;
  font-size: 1em;
  font-weight: bold;
}
.mainButton:disabled {
  font-weight: normal;
}
</style>
