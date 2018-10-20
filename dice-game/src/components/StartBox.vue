<template>
  <div>
    <p>Number of players: <input type="text" v-model="numPlayersInput" /></p>
    <p>Number of rounds: <input type="text" v-model="numRoundsInput" /></p>
    <button v-on:click="tryNewGame( numPlayers, numRounds )">Start Game</button>
  </div>
</template>

<script>
    export default {
        name: "StartBox",
        props: [ "defaults", "newGame" ],
        data: function() {
            return {
                numPlayersInput: ( this.defaults.numPlayers ? this.defaults.numPlayers : 99 ),
                numRoundsInput: ( this.defaults.numRounds ? this.defaults.numRounds : 1 )
            };
        },
        computed: {
            numPlayers: function() {
                return parseInt( this.numPlayersInput );
            },
            numRounds: function() {
                return parseInt( this.numRoundsInput );
            }
        },
        methods: {
            tryNewGame: function( numPlayers, numRounds ) {
                if ( isNaN( numPlayers ) ) {
                  alert( "Invalid number of players." );
                  return;
                }
                if ( numPlayers < 2 || numPlayers > 8 ) {
                  alert( "Number of players must be between 2 and 8." );
                  return;
                }
                if ( isNaN( numRounds ) ) {
                    alert( "Invalid number of rounds." );
                    return;
                }
                if ( numRounds < 1 || numRounds > 10 ) {
                    alert( "Number of rounds must be between 1 and 10." );
                    return;
                }
                this.newGame( numPlayers, numRounds );
            }
        }
    }
</script>

<style scoped>

</style>
