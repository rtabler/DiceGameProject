<template>
  <div>
    <Subtitle></Subtitle>
    <StartBox :new-game="this.newGame"></StartBox>
  </div>
</template>

<script>
    import Subtitle from "./Subtitle";
    import StartBox from "./StartBox";
    export default {
        name: "StartScreen",
        props: [ "newGame" ],
        components: { StartBox, Subtitle }
    }
</script>

<style scoped>

</style>
