<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import CountBox from "./components/CountBox.vue";
</script>

<script>
export default {
  data() {
    return {
      timeLeft: 0,
      countDownDate: 1644094573523,
      inputTime: "pucko",
      timeUnit: "hours",
      order: ["seconds", "minutes", "hours", "days"],
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
  watch: {
    inputTime(inputTime) {
      const hours = inputTime.slice(0, 2);
      const minutes = inputTime.slice(3, 6);
      // check if hours and minutes are numbers
      if (hours.match(/^\d+$/) && minutes.match(/^\d+$/)) {
        let time = new Date();
        time.setHours(hours);
        time.setMinutes(minutes);
        time.setSeconds(0);
        this.countDownDate = time.getTime();
      }

      if (inputTime.length === 3 && inputTime[2] !== ":") {
        if (/^\d+$/.test(this.inputTime[2])) {
          this.inputTime =
            this.inputTime.slice(0, 2) + ":" + this.inputTime.slice(2);
        } else {
          this.inputTime = this.inputTime.slice(0, 2) + ":";
        }
      }
    },
  },
};
</script>

<template>
  <input
    type="text"
    autocomplete="off"
    v-model="inputTime"
    :timeUnit="timeUnit"
  />
  <CountBox
    v-for="(timeUnit, index) in order"
    v-if="timeLeft > 0"
    :timeLeft="timeLeft"
    :timeUnit="timeUnit"
  />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
