<template>
  <button v-on:click="clickRulesButton()" v-bind:class="{rulesButton:true}">Game Rules</button>
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
  width: 100px;
}
</style>
