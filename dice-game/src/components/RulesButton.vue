<template>
  <button v-bind:class="{rulesButton:true}">Game Rules</button>
</template>

<script>
    export default {
        name: "RulesButton"
    }
</script>

<style scoped>
.rulesButton {
  width: 100px;
}
</style>
