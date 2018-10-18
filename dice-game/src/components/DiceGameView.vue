<template>
  <div>
    <Title></Title>
    <StartScreen v-if="( this.game === null )" :new-game="this.createNewDiceGame"></StartScreen>
    <GameInterface v-else :game="game"></GameInterface>
  </div>
</template>

<script>

import GameInterface from './GameInterface'
import Title from "./Title"
import StartScreen from "./StartScreen"
import DieState from '../DieState.js'

function DiceData( numDice ) {
    let diceArray = [];
    for ( let i=0; i<numDice; i++ ) {
        diceArray.push({
            dieState: DieState.notYetRolled,
            dieNumber: null
        });
    }
    return diceArray;
}

let diceValues = {
  1: 1,
  2: 2,
  3: 3,
  4: 0,
  5: 5,
  6: 6
}

class GameModel {
    constructor( numDice, numPlayers ) {
        this.numDice = numDice;
        this.numPlayers = numPlayers;
        this.currentRound = 0;
        this.currentPlayer = 0;
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

        this.diceData = [];
        for ( let i=0; i<this.numDice; i++ ) {
            this.diceData.push({
                dieState: DieState.notYetRolled,
                dieNumber: null
            });
        }
    }
    _diceAreNotYetRolled() {
        if ( this.diceData.length <= 0 ) { return false; }
        return this.diceData[0].dieState === DieState.notYetRolled;
    }
    _countDiceToLock() {
        let numDiceToLock = 0;
        for ( let i=0; i<this.diceData.length; i++ ) {
            if ( this.diceData[i].dieState === DieState.willLock ) {
                numDiceToLock++;
            }
        }
        return numDiceToLock;
    }
    _countLockedDice() {
        let numLockedDice = 0;
        for ( let i=0; i<this.diceData.length; i++ ) {
            if ( this.diceData[i].dieState === DieState.locked ) {
                numLockedDice++;
            }
        }
        return numLockedDice;
    }
    _lockAllDice() {
        for ( let i=0; i<this.diceData.length; i++ ) {
            this.diceData[i].dieState = DieState.locked;
        }
    }
    _rollDice() {
        let rollDie = function() {
            return Math.floor( 6 * Math.random() + 1 );
        };
        this.diceData = this.diceData.map( function( dieData ) {
            if ( dieData.dieState === DieState.notYetRolled ) {
                dieData.dieState = DieState.unlocked;
                dieData.dieNumber = rollDie();
            } else if ( dieData.dieState === DieState.willLock ) {
                dieData.dieState = DieState.locked;
            } else if ( dieData.dieState === DieState.unlocked ) {
                dieData.dieNumber = rollDie();
            }
            return dieData;
        });
    }
    _nextTurn() {
        let tallyScores = 0;
        this.diceData.forEach( function( dieData ) {
            tallyScores += diceValues[ dieData.dieNumber ];
        });

        let updatedScores = this.scores.slice();
        updatedScores[ this.currentRound ][ this.currentPlayer ] = tallyScores;
        this.scores = updatedScores;

        this.currentPlayer++;
        this.currentRound += Math.floor( this.currentPlayer / this.numPlayers );
        this.currentPlayer %= this.numPlayers;
        this.gameState = !!Math.floor(this.currentRound / this.rounds);
        this.diceData = new DiceData( 5 );
        if ( this.gameState ) {
            alert("Game over.");
        }
    }
    clickDie( dieClickedOn ) {
        let dieData = this.diceData[ dieClickedOn ];
        if ( dieData.dieState === DieState.unlocked ) {
            dieData.dieState = DieState.willLock;
        } else if ( dieData.dieState === DieState.willLock ) {
            dieData.dieState = DieState.unlocked;
        }
    }
    clickMainButton() {
        if ( this._diceAreNotYetRolled() ) {
            this._rollDice();
            return;
        }
        let numLockedDice = this._countLockedDice();
        if ( numLockedDice === this.numDice ) {
            this._nextTurn();
        }
        let numDiceToLock = this._countDiceToLock();
        if ( numDiceToLock < 1 ) {
            return;
        }
        this._rollDice();
        numLockedDice = this._countLockedDice();
        if ( numLockedDice + 1 >= this.numDice ) {
            this._lockAllDice();
        }
    }
}

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
              console.log("GameModel object already created.");
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
            this.game = new GameModel( 5, numPlayers );
            console.log(this.game);
        }
    }
}
</script>

<style scoped>

</style>
