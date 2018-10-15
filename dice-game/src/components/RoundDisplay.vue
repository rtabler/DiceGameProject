<template>
  <div>
    <p>Round</p>
    <p>{{ roundText }}</p>
  </div>
</template>

<script>
    export default {
        name: "RoundDisplay",
        props: [ "roundNumber", "totalRounds" ],
        computed: {
            roundText: function() {
                return this.roundNumber+"/"+this.totalRounds;
            }
        }
    }
</script>

<style scoped>

</style>
