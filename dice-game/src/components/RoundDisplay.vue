<template>
  <div v-bind:class="{ roundDisplay:true }">
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
                return (this.roundNumber+1)+"/"+this.totalRounds;
            }
        }
    }
</script>

<style scoped>
.roundDisplay {
  display: inline-block;
  border-style: solid;
  border-radius: 30px;
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>
