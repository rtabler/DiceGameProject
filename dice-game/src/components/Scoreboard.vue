<template>
  <table>
    <tr>
      <th></th>
      <th v-for="playerName in playerNames">{{ playerName }}</th>
    </tr>
    <tr v-for="(thisRoundScores,index) in scores">
      <td>Round {{index+1}}</td>
      <td v-for="playerScore in thisRoundScores">{{ playerScore }}</td>
    </tr>
  </table>
</template>

<script>
    export default {
        name: "Scoreboard",
        props: [ "gameScores", "players" ],
        data: function() {
            return {
                // scores: [1,2,3]
            }
        },
        computed: {
            scores: function() {
                return this.gameScores;
            },
            playerNames: function() {
                return this.players;
            }
        }
    }
</script>

<style scoped>

</style>
