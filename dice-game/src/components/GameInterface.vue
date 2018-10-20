<template>
  <div v-bind:class="{gameInterface:true}">
    <div v-bind:class="{topBar:true}">
      <RoundDisplay :round-number="this.currentRound" :total-rounds="this.totalRounds"></RoundDisplay>
      <Scoreboard :game-scores="this.gameScores" :players="this.gamePlayers"></Scoreboard>
      <RulesButton :click-rules-button="this.clickRulesButton"></RulesButton>
    </div>
    <br>
    <PlayBox :game-over="game.gameOver" :winners="game.winners" :player-names="game.playerNames" :current-player="game.currentPlayer" :dice-data="diceData" :click-die="clickDie" :click-main-button="clickMainButton" class="playBoxComponent"></PlayBox>
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
.topBar {
  /*color: red;*/
  display: flex;
  justify-content: space-between;
  max-width: 600px;
  margin: auto;
}
.playBoxComponent {
  display: block;
  margin: auto;
}
</style>
