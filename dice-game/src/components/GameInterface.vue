<template>
  <div :class="['gameInterface']">
    <div :class="['topBar', 'gameInterfaceBlock']">
      <RoundDisplay :round-number="game.currentRound" :total-rounds="game.numRounds" :class="['topBarItem']"></RoundDisplay>
      <Scoreboard :players="game.playerNames" :game-scores="game.scores" :game-totals="this.game.totals" :class="['topBarItem']"></Scoreboard>
      <RulesButton :click-rules-button="this.clickRulesButton" :class="['topBarItem']"></RulesButton>
    </div>
    <PlayBox :game-over="game.gameOver" :winners="game.winners" :winning-score="game.winningScore" :player-names="game.playerNames" :current-player="game.currentPlayer" :dice-data="game.diceData" :click-die="clickDie" :click-main-button="clickMainButton" class="playBoxComponent gameInterfaceBlock"></PlayBox>
  </div>

</template>

<script>
    import RoundDisplay from "./RoundDisplay";
    import Scoreboard from "./Scoreboard";
    import RulesButton from "./RulesButton";
    import PlayBox from "./PlayBox";
    import GameModel from "../GameModel";
    export default {
        name: "GameInterface",
        props: [ "setOverlay", "game", "resetGame" ],
        components: {PlayBox, RulesButton, Scoreboard, RoundDisplay},
        data: function() {
            return {
                showPanel: false
            }
        },
        computed: {
        },
        methods: {
            clickRulesButton: function () {
                this.setOverlay( true );
                this.showPanel = true;
            },
            clickDie: function( dieIndex ) {
                this.game.clickDie( dieIndex );
            },
            clickMainButton: function() {
                if ( this.game.gameOver ) {
                    this.resetGame();
                }
                this.game.clickMainButton();
            }
        }
    }
</script>

<style scoped>
.gameInterface {
  text-align: center;
  position: relative;
}
.gameInterfaceBlock {
  margin-top: 20px;
  margin-bottom: 20px;
}
.topBar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
}
.topBarItem {
  margin-left: 10px;
  margin-right: 10px;
}
.playBoxComponent {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
