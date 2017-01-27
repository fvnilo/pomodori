<template>
  <div class="remaining-time">    
    <div id="container"></div>
  </div>
</template>

<script>
import ProgressBar from 'progressbar.js';

import Helpers from 'src/helpers';

export default {
  name: 'timer',

  props: {
    currentTime: {
      required: true,
      type: Number,
    },

    totalTime: {
      required: true,
      type: Number,
    },
  },

  mounted() {
    const self = this;

    const container = this.$el.querySelector('#container');
    const circleProgressBar = new ProgressBar.Circle(container, {
      color: '#aaa',
      strokeWidth: 4,
      trailWidth: 1,
      easing: 'easeInOut',
      from: { color: '#aaa', width: 1 },
      to: { color: '#333', width: 4 },
      step(state, circle) {
        const time = self.remaningTime;

        circle.path.setAttribute('stroke', state.color);
        circle.path.setAttribute('stroke-width', state.width);

        self.$emit('time-update', time);

        circle.setText(time);
      },
    });

    circleProgressBar.text.style.fontSize = '2rem';
    circleProgressBar.set(1.0);

    this.progressBar = circleProgressBar;
  },

  watch: {
    currentTime(time) {
      const progress = time / this.totalTime;

      this.progressBar.set(progress);
    },
  },

  computed: {
    remaningTime() {
      const seconds = this.currentTime % 60;
      const minutes = Math.floor(this.currentTime / 60);

      return `${Helpers.toTwoDigits(minutes)}:${Helpers.toTwoDigits(seconds)}`;
    },

    seconds() {
      return this.value % 60;
    },
  },
};
</script>

<style scoped>
.remaining-time {
  display: flex;

  justify-content: center;

  font-size: 6em;
  margin: 1em 0;
}

#container {
  height: 3em;
  width: 3em;
}
</style>