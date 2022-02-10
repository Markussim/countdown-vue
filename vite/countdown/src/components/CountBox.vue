<script>
export default {
  props: {
    timeLeft: {
      type: Number,
      default: 0,
    },
    timeUnit: {
      type: String,
      default: "seconds",
    },
  },
  computed: {
    seconds() {
      return (this.timeLeft / 1000).toFixed(3);
    },
    minutes() {
      return (this.timeLeft / 1000 / 60).toFixed(3);
    },
    hours() {
      return (this.timeLeft / 1000 / 60 / 60).toFixed(3);
    },
    days() {
      return (this.timeLeft / 1000 / 60 / 60 / 24).toFixed(3);
    },
    timeLeftFormatted() {
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
  <p>{{ timeLeftFormatted }} in {{ timeUnit }}</p>
</template>
