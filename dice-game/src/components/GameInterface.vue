<template>
  <div>
    <RoundDisplay :round-number="this.currentRound" :total-rounds="this.totalRounds"></RoundDisplay>
    <Scoreboard :game-scores="this.gameScores" :players="this.gamePlayers"></Scoreboard>
    <RulesButton></RulesButton>
    <PlayBox></PlayBox>
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
            }
        }
    }
</script>

<style scoped>

</style>
