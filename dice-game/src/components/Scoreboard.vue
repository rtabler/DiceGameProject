<template>
  <table :class="['scoreboard']">
    <tr>
      <th :class="['roundCell']">Scores</th>
      <th v-for="playerName in playerNames" :class="['playerCell']">{{ playerName }}</th>
    </tr>
    <tr v-for="(thisRoundScores,index) in scores">
      <th :class="['roundCell']">Round {{index+1}}</th>
      <td v-for="playerScore in thisRoundScores" :class="['playerCell']">{{ playerScore }}</td>
    </tr>
    <tr>
      <th>Total</th>
      <th v-for="playerTotal in this.gameTotals">{{ playerTotal }}</th>
    </tr>
  </table>
</template>

<script>
    export default {
        name: "Scoreboard",
        props: [ "players", "gameScores", "gameTotals" ],
        data: function() {
            return {
            }
        },
        computed: {
            playerNames: function() {
                return this.players;
            },
            scores: function() {
                return this.gameScores;
            }
        }
    }
</script>

<style scoped>
table {
  text-align: center;
  border: 1px solid black;
  border-spacing: 0px;
}
td {
  margin: 0px;
}
.roundCell {
  width: 80px;
}
.playerCell {
  width: 40px;
  border-left: 1px solid black;
  /*border-top: 1px solid black;*/
}
</style>
