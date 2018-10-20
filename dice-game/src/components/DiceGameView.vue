<template>
  <div v-bind:style="{ backgroundColor: 'orange', border: '0.1px solid rgba(0,0,0,0)', height: '100vh', position: 'relative' }">
    <div v-if="overlay" v-on:click="clickOffPanel" v-bind:class="{overlayItem:true, overlayPanelArea:true}">
      <div v-if="overlay" v-on:click="e => e.stopImmediatePropagation()" v-bind:class="{overlayPanel:true, rulesText:true}">
        <h2 v-bind:style="{ textAlign: 'center' }">Dice Game rules:</h2>
        <p>In this game players roll dice and try to collect the lowest score. A 4 counts as zero, all other numbers count as face value. A player’s score is the total spots showing on the dice when she finishes her turn (excluding fours because they’re zero). The object of the game is to get the lowest score possible.</p>
        <p>The game is played as follows between 4 players:</p>
        <ul>
          <li>Play starts with one person randomly being chosen to start rolling and proceeds in succession until all players have rolled.</li>
          <li>The player rolls all five dice, then must keep at least one dice but may keep more at her discretion (She can stop on her first roll if she so wishes).</li>
          <li>Those dice which are not kept are rolled again and each round she must keep at least one more until all the dice are out.</li>
          <li>Once each player has rolled the player who scored the lowest wins.</li>
          <li>Repeat for three more rounds in succession so that the next person starts rolling first (at the end each player will have started).</li>
        </ul>
      </div>
    </div>
    <div v-if="overlay" v-bind:class="{overlayItem:true, overlayShadow:true}">
    </div>
    <Title></Title>
    <StartScreen v-if="( this.game === null )" :defaults="gameSettingsDefaults" :new-game="this.createNewDiceGame"></StartScreen>
    <GameInterface v-else :game="game" :reset-game="resetGame" :set-overlay="this.setOverlay"></GameInterface>
  </div>
</template>

<script>

import GameInterface from './GameInterface'
import Title from "./Title"
import StartScreen from "./StartScreen"

import GameModel from '../GameModel'

export default {
    name: "DiceGameView",
    components: {GameInterface, StartScreen, Title},
    props: [],
    data: function() {
        return {
            overlay: false,
            game: null,
            gameSettingsDefaults: {
                numPlayers: 4,
                numRounds: 4,
                numDice: 5
            }
        }
    },
    computed: {
    },
    methods: {
        setOverlay: function( state ) {
            this.overlay = state;
        },
        clickOffPanel: function() {
            this.setOverlay( false );
        },
        setDefaults: function( settingsObject ) {
            this.gameSettingsDefaults = Object.assign( this.gameSettingsDefaults, settingsObject );
            console.log( this.gameSettingsDefaults );
        },
        resetGame: function() {
            this.game = null;
        },
        createNewDiceGame: function( numPlayers, numRounds ) {
            if ( this.game !== null ) {
                console.error("GameModel object already created.");
                alert( "Sorry, something is wrong with this game. Please try again later." );
                return;
            }
            let theseSettings = {
                numPlayers: numPlayers,
                numRounds: numRounds
            };
            this.setDefaults( theseSettings );
            this.game = new GameModel( numPlayers, numRounds, 5 );
            console.log(this.game);
        }
    }
}
</script>

<style scoped>
.overlayItem {
  position: absolute;
  z-index: 1;
  width: 100vw;
  height: 100vh;
}
.overlayPanelArea {
  z-index: 2;
}
.overlayPanel {
  background-color: aliceblue;
  position: relative;
  margin: auto;
  top: 120px;
  border: 0.1px solid transparent;
  width: 600px;
}
.overlayShadow {
  background-color: black;
  opacity: 0.4;
}
.rulesText {
  padding: 30px;
  text-align: left;
}
</style>
