<template>
  <div class="timer">    
    <span class="remaining-time">{{ minutes | twoDigits }}:{{ seconds | twoDigits }}</span>
  </div>
</template>

<script>
import filters from 'src/filters';

export default {
  name: 'timer',

  props: {
    value: {
      required: true,
      type: Number,
    },
  },

  computed: {
    minutes() {
      return Math.floor(this.value / 60);
    },

    seconds() {
      return this.value % 60;
    },
  },

  filters,
};
</script>

<style scoped>
.timer {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.remaining-time {
  font-size: 6em;
  margin: 20px 0;
}
</style>