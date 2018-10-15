<template>
  <div>
    <Title></Title>
    <StartScreen v-show="( this.game === null )" :new-game="this.createNewDiceGame"></StartScreen>
    <GameInterface v-show="( this.game !== null )" :game="game"></GameInterface>
  </div>
</template>

<script>

    import GameInterface from "./GameInterface";

    class DiceGame {
        constructor( numPlayers ) {
            this.numPlayers = numPlayers;
            this.currentRound = 1;
            this.rounds = 4;
            this.playerNames = [];
            for ( let i=0; i<numPlayers; i++ ) {
                this.playerNames.push( "P"+(i+1) );
            }
            this.scores = [];
            for ( let i=0; i<this.rounds; i++ ) {
                let roundScores = [];
                for ( let j=0; j<numPlayers; j++ ) {
                    roundScores.push( null );
                }
                this.scores.push( roundScores );
            }
        }
    }

    import Title from "./Title";
    import StartScreen from "./StartScreen";
    export default {
        name: "DiceGameView",
        components: {GameInterface, StartScreen, Title},
        data: function() {
            return {
                game: null
            }
        },
        computed: {
        },
        methods: {
            createNewDiceGame: function( numPlayers ) {
                if ( this.game !== null ) {
                    console.log("DiceGame object already created.");
                    return;
                }
                if ( isNaN( numPlayers ) ) {
                    console.log("Invalid number of players.");
                    return;
                }
                if ( numPlayers < 2 || numPlayers > 6 ) {
                    console.log("Invalid number of players. Should be between 2 and 6.");
                    return;
                }
                this.game = new DiceGame( numPlayers );
                console.log("DiceGame created.");
                console.log(this.game);
            }
        }
    }
</script>

<style scoped>

</style>
