<template>
  <div :class="['roundDisplay']">
    <p :class="['roundLabel']">Round</p>
    <p :class="['roundFraction']">
      <a :class="['totalRounds']" :style="{color:'transparent'}">/{{ totalRounds }}</a><a :class="['roundNumber']">{{ roundNumber+1 }}</a><a :class="['totalRounds']">/{{ totalRounds }}</a>
    </p>
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
  border: 2px solid;
  border-radius: 30px;
  width: 100px;
  height: 100px;
  user-select: none;
  text-align: center;
  /*margin: 0px;*/
}
.roundDisplay>p {
  /*margin-top: 12px;*/
  /*margin-bottom: 12px;*/
}
.roundLabel {
  margin-bottom: 0px;
}
.roundFraction {
  margin-top: 0px;
}
.roundNumber {
  font-size: 3em;
}
.totalRounds {
  font-size: 1.5em;
}
</style>
