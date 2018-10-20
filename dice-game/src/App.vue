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
  background-color: darkkhaki;
  margin: 0px;
  padding: 0px;
  overflow: hidden;
}
#app {
  font-family: 'Optima', sans-serif;
  background-color: #2c3e50;
  margin: 0px;
  text-align: center;
}
</style>
