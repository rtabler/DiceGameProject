<template>
  <table :class="['scoreboard']">
    <tr :class="['headerRow']">
      <th :class="['headerCell']">Scores</th>
      <th v-for="playerName in playerNames" :class="['headerCell','playerCell']">{{ playerName }}</th>
    </tr>
    <tr v-for="(thisRoundScores,roundNumber) in scores"
        :class="{evenRow:(roundNumber%2===0), oddRow:(roundNumber%2===1)}">
      <td :class="['roundCell']">Round {{roundNumber+1}}</td>
      <td v-for="(playerScore,playerNumber) in thisRoundScores"
          :class="{playerCell:true,roundWinningCell:isRoundWinningCell(roundNumber,playerNumber)}">{{ playerScore }}</td>
    </tr>
    <tr>
      <th :class="['footerCell']">Total</th>
      <th v-for="playerTotal in this.gameTotals" :class="['footerCell']">{{ playerTotal }}</th>
    </tr>
  </table>
</template>

<script>
    export default {
        name: "Scoreboard",
        props: [ "players", "roundWinners", "gameScores", "gameTotals" ],
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
        },
        methods: {
            isRoundWinningCell: function( roundNumber, playerNumber ) {
                return ( roundNumber < this.roundWinners.length &&
                  ( this.roundWinners[ roundNumber ].indexOf( playerNumber ) >= 0 ) );
            }
        }
    }
</script>

<style scoped>
table {
  background-color: white;
  text-align: center;
  border: 1px solid black;
  border-spacing: 0px;
}

.headerRow {
  background-color: #ffd053;
  border-bottom: 1px solid black;
}
.evenRow {
  background-color: #e0c6ff;
}
.oddRow {
  background-color: #c6e1ff;
}

td, th {
  padding: 3px;
  margin: 0;
}
.roundCell {
  width: 80px;
}
.roundWinningCell {
  text-decoration: underline;
}
.headerCell {
  width: 80px;
  border-bottom: 1px solid black;
}
.footerCell {
  border-top: 1px solid black;
}
.playerCell {
  width: 40px;
}
</style>
