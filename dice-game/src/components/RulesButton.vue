<template>
  <button v-on:click="clickRulesButton()" :class="{rulesButton:true}">Game Rules</button>
</template>

<script>
    export default {
        name: "RulesButton",
        props: [ "clickRulesButton" ],
        methods: {
        }
    }
</script>

<style scoped>
.rulesButton {
  background-color: white;
  color: black;
  border-radius: 25px;
  border: 2px solid black;
  width: 100px;
  height: 100px;
  font-size: 1em;
  cursor: pointer;
}
</style>
