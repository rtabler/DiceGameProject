<template>
  <div v-bind:class="{gameInterface:true}">
    <div v-bind:class="{topBar:true}">
      <RoundDisplay :round-number="this.currentRound" :total-rounds="this.totalRounds"></RoundDisplay>
      <Scoreboard :game-scores="this.gameScores" :players="this.gamePlayers"></Scoreboard>
      <RulesButton></RulesButton>
    </div>
    <br>
    <PlayBox :current-player-name="currentPlayerName" :dice-data="diceData" :click-die="clickDie" :click-main-button="clickMainButton" class="playBoxComponent"></PlayBox>
  </div>

</template>

<script>
    import RoundDisplay from "./RoundDisplay";
    import Scoreboard from "./Scoreboard";
    import RulesButton from "./RulesButton";
    import PlayBox from "./PlayBox";
    export default {
        name: "GameInterface",
        props: [ "game" ],
        components: {PlayBox, RulesButton, Scoreboard, RoundDisplay},
        data: function() {
            return {
            }
        },
        computed: {
            currentRound: function() {
                if ( this.game === null ) { return -1; }
                return this.game.currentRound;
            },
            totalRounds: function() {
                if ( this.game === null ) { return -1; }
                return this.game.rounds;
            },
            gameScores: function() {
                if ( this.game === null ) { return []; }
                return this.game.scores;
            },
            gamePlayers: function() {
                if ( this.game === null ) { return []; }
                return this.game.playerNames;
            },
            currentPlayerName: function() {
                return this.game.playerNames[ this.game.currentPlayer ];
            },
            diceData: function() {
                // console.log("Check this dice");
                // console.log(this.game.dice);
                return this.game.diceData;
            }
        },
        methods: {
            clickDie: function( dieIndex ) {
                this.game.clickDie( dieIndex );
            },
            clickMainButton: function() {
                this.game.clickMainButton();
            }
        }
    }
</script>

<style scoped>
.gameInterface {
  text-align: left;
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
