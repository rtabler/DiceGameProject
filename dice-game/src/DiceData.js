import DieState from './DieState'

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
export default DiceData;
