<script>
export default {
  props: {
    timeLeft: {
      type: Number,
      default: 0,
    },
    timeUnit: String,
  },
  computed: {
    seconds() {
      return (this.timeLeft / 1000).toFixed(3) + " seconds left";
    },
    minutes() {
      return (this.timeLeft / 1000 / 60).toFixed(3) + " minutes left";
    },
    hours() {
      return (this.timeLeft / 1000 / 60 / 60).toFixed(3) + " hours left";
    },
    days() {
      return (this.timeLeft / 1000 / 60 / 60 / 24).toFixed(3) + " days left";
    },
    timeLeftFormatted() {
      console.log(this.timeUnit);
      if (this.timeUnit === "seconds") {
        return this.seconds;
      } else if (this.timeUnit === "minutes") {
        return this.minutes;
      } else if (this.timeUnit === "hours") {
        return this.hours;
      } else if (this.timeUnit === "days") {
        return this.days;
      }
    },
  },
};
</script>

<template>
  <p>{{ timeLeftFormatted }}</p>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
