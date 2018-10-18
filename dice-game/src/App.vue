<template>
  <div id="app">
    <DiceGameView></DiceGameView>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import DiceGameView from "./components/DiceGameView"

export default {
  name: 'App',
  components: {
    DiceGameView,
    HelloWorld
  }
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  font-family: 'Optima', 'Papyrus';
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  /*text-align: center;*/
  /*color: #2c3e50;*/
  /*margin-top: 60px;*/
  text-align: center;
}
</style>
