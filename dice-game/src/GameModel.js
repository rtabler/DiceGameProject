import DieState from './DieState'
import DiceData from './DiceData'
import DieValue from './DieValue'

class GameModel {
  constructor( numPlayers, numRounds, numDice ) {
    // game over state data
    this.gameOver = false;
    this.winningScore = -1;
    this.winners = [];

    // game settings
    this.numPlayers = numPlayers;
    this.numRounds = numRounds;
    this.numDice = numDice;

    // game state
    this.betweenRounds = false;
    this.currentRound = 0;
    this.startingPlayer = Math.floor( numPlayers * Math.random() );
    this.currentPlayer = this.startingPlayer;
    this.diceData = [];
    for ( let i=0; i<this.numDice; i++ ) {
      this.diceData.push({
        dieState: DieState.notYetRolled,
        dieNumber: null
      });
    }

    // player data
    this.playerNames = [];
    for ( let i=0; i<numPlayers; i++ ) {
      this.playerNames.push( "P"+(i+1) );
    }

    // player scores
    this.scores = [];
    for (let i=0; i<this.numRounds; i++ ) {
      let roundScores = [];
      for ( let j=0; j<numPlayers; j++ ) {
        roundScores.push( null );
      }
      this.scores.push( roundScores );
    }

    // round scores
    this.roundWinners = [];

    // player totals
    this.totals = new Array( numPlayers ).fill( 0 );
  }

  // convenience functions for checking model
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

  // convenience functions for editing model
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
  _calculateRoundWinners() {
      let thisRoundScores = this.scores[ this.currentRound ];
      let thisRoundWinners = [];
      let thisRoundWinningScore = this.numPlayers * 6 + 1;
      thisRoundScores.forEach( function( score, player ) {
          if ( score < thisRoundWinningScore ) {
              thisRoundWinningScore = score;
              thisRoundWinners = [ player ];
          } else if ( score === thisRoundWinningScore ) {
              thisRoundWinners.push( player );
          }
      });
      this.roundWinners.push( thisRoundWinners );
  }
  _endGame() {
    this.gameOver = true;
    let playerScoreTotals = new Array( this.numPlayers ).fill( 0 );
    this.scores.forEach( function( roundScores ) {
      roundScores.forEach( function( playerScore, player ) {
        playerScoreTotals[ player ] += playerScore;
      });
    });
    console.log(playerScoreTotals);

    let winningScore = this.numRounds * this.numPlayers * 6 + 1;
    let winners = [];
    for ( let i=0; i<this.numPlayers; i++ ) {
      if ( playerScoreTotals[ i ] < winningScore ) {
        winningScore = playerScoreTotals[ i ];
        winners = [ i ];
      } else if ( playerScoreTotals[ i ] === winningScore ) {
        winners.push( i );
      }
    }
    this.winningScore = winningScore;
    this.winners = winners;
    this.diceData = new DiceData( this.numDice );
  }
  _nextTurn() {
    let tallyScores = 0;
    this.diceData.forEach( function( dieData ) {
      tallyScores += DieValue[ dieData.dieNumber ];
    });

    let updatedScores = this.scores.slice();
    updatedScores[ this.currentRound ][ this.currentPlayer ] = tallyScores;
    this.scores = updatedScores;

    let updatedTotals = this.totals.slice();
    updatedTotals[ this.currentPlayer ] += tallyScores;
    this.totals = updatedTotals;

    this.currentPlayer = ( this.currentPlayer + 1 ) % this.numPlayers;
    if ( this.currentPlayer === this.startingPlayer ) {
      this._calculateRoundWinners();

      if ( this.currentRound + 1 < this.numRounds ) {
        this.betweenRounds = true;
        this.currentRound++;
        this.startingPlayer = ( this.startingPlayer + 1 ) % this.numPlayers;
        this.currentPlayer = this.startingPlayer;
      } else {
        this._endGame();
      }
    }

    this.diceData = new DiceData( this.numDice );
  }

  // public functions to be called by the view / controller
  clickDie( dieClickedOn ) {
    let dieData = this.diceData[ dieClickedOn ];
    if ( dieData.dieState === DieState.unlocked ) {
      dieData.dieState = DieState.willLock;
    } else if ( dieData.dieState === DieState.willLock ) {
      dieData.dieState = DieState.unlocked;
    }
  }
  clickMainButton() {
    if ( this.betweenRounds ) {
      this.betweenRounds = false;
      return;
    }
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

export default GameModel
