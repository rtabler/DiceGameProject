<template>
  <div id="app">
    <DiceGameView></DiceGameView>
  </div>
</template>

<script>
import DiceGameView from "./components/DiceGameView"

export default {
    name: 'App',
    components: {
        DiceGameView
    },
    data: function() {
        return {
        }
    },
    methods: {
    }
}
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  background-color: #ffbe13;
  margin: 0px;
  padding: 0px;
  overflow: hidden;
}
button {
  width: 300px;
  height: 50px;
}
#app {
  font-family: 'Optima', sans-serif;
  margin: 0px;
  text-align: center;
}
</style>
