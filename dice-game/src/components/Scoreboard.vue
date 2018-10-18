<template>
  <table v-bind:class="{scoreboard:true}">
    <tr>
      <th v-bind:class="{roundCell:true}">Scores</th>
      <th v-for="playerName in playerNames" v-bind:class="{playerCell:true}">{{ playerName }}</th>
    </tr>
    <tr v-for="(thisRoundScores,index) in scores">
      <th v-bind:class="{roundCell:true}">Round {{index+1}}</th>
      <td v-for="playerScore in thisRoundScores" v-bind:class="{playerCell:true}">{{ playerScore }}</td>
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
