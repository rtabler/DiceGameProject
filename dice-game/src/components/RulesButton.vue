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
  border-radius: 25px;
  width: 100px;
  height: 100px;
  font-size: 1em;
}
</style>
