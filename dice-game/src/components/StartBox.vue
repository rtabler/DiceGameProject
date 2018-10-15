<template>
  <div>
    <p>Number of players: <input type="text" v-model="numPlayersInput" /></p>
    <button v-on:click="newGame( numPlayers )">Start Game</button>
  </div>
</template>

<script>
    export default {
        name: "StartBox",
        props: [ "newGame" ],
        data: function() {
            return {
                numPlayersInput: 4
            }
        },
        computed: {
            numPlayers: function() {
                return parseInt( this.numPlayersInput );
            }
        },
        methods: {
            someFunc: function() {
                alert("Clicked on button.");
            }
        }
    }
</script>

<style scoped>

</style>
