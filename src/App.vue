<script setup lang="ts">
  import { watch, ref } from 'vue';

  let countdowndate = new Date();
  countdowndate.setHours(17);
  countdowndate.setMinutes(0);
  countdowndate.setSeconds(0);
  countdowndate.setMilliseconds(0);

  const minutesLeft = ref('');

  // Update the minutesLeft every frame
  const updateMinutesLeft = () => {
    const now = new Date();
    const diff = countdowndate.getTime() - now.getTime();
    const minutes = diff / 1000 / 60;
    minutesLeft.value = minutes.toFixed(2);
    requestAnimationFrame(updateMinutesLeft);
  };

  requestAnimationFrame(updateMinutesLeft);
</script>

<template>
  <div>
    {{ minutesLeft }}
  </div>
</template>
