<template>
  <div>
    <Subtitle></Subtitle>
    <StartBox :defaults="defaults" :new-game="this.newGame"></StartBox>
  </div>
</template>

<script>
    import Subtitle from "./Subtitle";
    import StartBox from "./StartBox";
    export default {
        name: "StartScreen",
        props: [ "defaults", "newGame" ],
        components: { StartBox, Subtitle }
    }
</script>

<style scoped>

</style>
