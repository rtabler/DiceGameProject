<template>
  <div v-bind:class="{gameInterface:true}">
    <div v-bind:class="{topBar:true, gameInterfaceBlock:true}">
      <RoundDisplay :round-number="this.currentRound" :total-rounds="this.totalRounds" v-bind:class="{topBarItem:true}"></RoundDisplay>
      <Scoreboard :players="this.gamePlayers" :game-scores="this.gameScores" :game-totals="this.game.totals" v-bind:class="{topBarItem:true}"></Scoreboard>
      <RulesButton :click-rules-button="this.clickRulesButton" v-bind:class="{topBarItem:true}"></RulesButton>
    </div>
    <PlayBox :game-over="game.gameOver" :winners="game.winners" :player-names="game.playerNames" :current-player="game.currentPlayer" :dice-data="diceData" :click-die="clickDie" :click-main-button="clickMainButton" class="playBoxComponent gameInterfaceBlock"></PlayBox>
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
            currentRound: function() {
                if ( this.game === null ) { return -1; }
                return this.game.currentRound;
            },
            totalRounds: function() {
                if ( this.game === null ) { return -1; }
                return this.game.numRounds;
            },
            gameScores: function() {
                if ( this.game === null ) { return []; }
                return this.game.scores;
            },
            gamePlayers: function() {
                if ( this.game === null ) { return []; }
                return this.game.playerNames;
            },
            diceData: function() {
                // console.log("Check this dice");
                // console.log(this.game.dice);
                return this.game.diceData;
            }
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
