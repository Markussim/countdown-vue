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
      inputTime: "",
      timeUnit: "hours",
      order: ["seconds", "minutes", "hours", "days"],
      started: false,
      error: "",
    };
  },
  mounted() {
    if (localStorage.getItem("countDownDate")) {
      this.inputTime = this.unixToTime(localStorage.getItem("countDownDate"));
    }
    this.updateTimeLeft();
    this.updateTitle();
  },
  methods: {
    updateTimeLeft() {
      this.timeLeft = this.countDownDate - Date.now();
      if (this.timeLeft <= 0) {
        this.timeLeft = 0;
        if (this.inputTime.length >= 5 && this.started) {
          this.inputTime = "";
          if (this.error.length == 0 && this.started) {
            this.error = "Time has passed";
          }
        }
      }
      this.started = true;
      window.requestAnimationFrame(() => {
        this.updateTimeLeft();
      });
    },
    unixToTime(unix) {
      const date = new Date(parseInt(unix));
      if (date - Date.now() < 0) {
        return "";
      }
      let hours = date.getHours();
      let minutes = date.getMinutes();
      if (hours < 10) {
        hours = "0" + hours;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      return hours + ":" + minutes;
    },
    updateTitle() {
      let timeLeftToUpdate =
        (this.timeLeft / 60000) * 60000 -
        (this.timeLeft / 60000).toFixed(1) * 60000;

      if (timeLeftToUpdate < 60000) {
        timeLeftToUpdate += 6000;
      } else {
        timeLeftToUpdate = 60000;
      }
      if (this.timeLeft > 0)
        document.title = (this.timeLeft / 60000).toFixed(1) + " minutes";
      else document.title = "Countdown";

      setTimeout(() => {
        this.updateTitle();
      }, timeLeftToUpdate);
    },
  },
  watch: {
    inputTime(inputTime) {
      const hours = inputTime.slice(0, 2);
      const minutes = inputTime.slice(3, 6);
      // check if hours and minutes are numbers
      if (
        hours.match(/^\d+$/) &&
        minutes.match(/^\d+$/) &&
        inputTime.length === 5
      ) {
        let time = new Date();
        time.setHours(hours);
        time.setMinutes(minutes);
        time.setSeconds(0);
        time.setMilliseconds(0);
        this.countDownDate = time.getTime();
        localStorage.setItem("countDownDate", this.countDownDate);
        this.error = "";
      } else {
        this.countDownDate = 0;
        localStorage.removeItem("countDownDate");
        if (inputTime.length >= 5) this.error = "Incorrectly formatted time";
      }

      if (inputTime.length === 3 && inputTime[2] !== ":") {
        if (/^\d+$/.test(this.inputTime[2])) {
          this.inputTime =
            this.inputTime.slice(0, 2) + ":" + this.inputTime.slice(2);
        } else {
          this.inputTime = this.inputTime.slice(0, 2) + ":";
        }
      }

      if (inputTime.length > 5) {
        this.inputTime = this.inputTime.slice(0, 5);
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
    placeholder="HH:MM"
  />
  <p v-if="error" style="color: red">{{ error }}</p>

  <div id="numbers">
    <CountBox
      v-for="(timeUnit, index) in order"
      v-if="timeLeft > 0"
      :timeLeft="timeLeft"
      :timeUnit="timeUnit"
    />
    <p v-else>Please input time</p>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");

#numbers p {
  font-size: 50px;
  height: 50px;
}

#numbers p:first-child {
  font-size: 100px;
}

p {
  text-align: left;
  font-family: "Roboto Mono", monospace;
  white-space: nowrap;
  opacity: 1;
  user-select: none;
}

@media (prefers-color-scheme: light) {
  body {
    background-color: white;
  }
  p {
    color: black;
  }
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: black;
  }
  p {
    color: white;
  }
}
</style>
