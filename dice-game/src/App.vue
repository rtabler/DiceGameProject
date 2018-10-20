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
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  font-family: 'Optima', 'Papyrus';
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  background-color: #2c3e50;
  /*margin-top: 60px;*/
  text-align: center;
  margin: 0px;
}
</style>
