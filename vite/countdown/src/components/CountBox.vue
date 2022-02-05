<script>
export default {
  data() {
    return {
      timeLeft: 0,
      countDownDate: 1644094573523,
    };
  },
  mounted() {
    this.updateTimeLeft();
  },
  methods: {
    updateTimeLeft() {
      this.timeLeft = this.countDownDate - Date.now();
      window.requestAnimationFrame(() => {
        this.updateTimeLeft();
      });
    },
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
  },
};
</script>

<template>
  <p>{{ seconds }}</p>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
