<template>
  <div class="remaining-time">    
    <span>{{ minutes | twoDigits }}:{{ seconds | twoDigits }}</span>
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
.remaining-time {
  font-size: 6em;
  margin: 1em 0;
}
</style>