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
  background-color: #fff3d3;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
button, button:disabled {
  background-color: #fefeff;
  opacity: 1;
  width: 300px;
  height: 50px;
  user-select: none;
}
#app {
  font-family: 'Optima', sans-serif;
  margin: 0;
  text-align: center;
}
</style>
