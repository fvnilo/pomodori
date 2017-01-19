<template>
  <div id="app">
    <div class="timer-container">
        <span class="title stopped" v-if="isFinished">Yay! You Finished Your {{ pomodoriCount }} Pomodori</span>
        <span class="title idle" v-if="isIdle || isFinished">How Many Pomodori?</span>
        <span class="title active" v-if="isInProgress">Pomodoro In Progress</span>
        <span class="title pause" v-if="isBreak">You Deserve A Break!</span>
        <span class="title stopped" v-if="isStopped">Need A (Longer) Break?</span>
        
        <numeric-selector class="pomodori-count" 
          v-if="isIdle || isFinished"
          :value="pomodoriCount" 
          @increase="increase"
          @decrease="decrease">  
        </numeric-selector>
        <timer v-if="isActive || isStopped" :value="remainingTime"></timer>
        <div class="button-container">
          <button class="button start" v-if="isIdle || isFinished" @click="start()">
            <i class="fa fa-3x fa-play" aria-hidden="true"></i>
          </button>
          <button class="button stop" v-if="isActive" @click="stop()">
            <i class="fa fa-3x fa-pause" aria-hidden="true"></i>
          </button>
          <button class="button resume" v-if="isStopped" @click="resume()">
            <i class="fa fa-3x fa-play" aria-hidden="true"></i>
          </button>
          <button class="button reset" v-if="isStopped" @click="reset()">
            <i class="fa fa-3x fa-refresh" aria-hidden="true"></i>
          </button>  
        </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import Timer from 'components/Timer';
import NumericSelector from 'components/NumericSelector';

import * as SequenceStatus from 'src/const/sequenceStatus';

export default {
  name: 'app',
  components: {
    Timer,
    NumericSelector,
  },

  computed: {
    ...mapState({
      pomodoriCount: ({ pomodoriCount }) => pomodoriCount,

      remainingTime: ({ remainingTime }) => remainingTime,

      isIdle: ({ status }) => status === SequenceStatus.IDLE,

      isActive: ({ status }) =>
        status === SequenceStatus.POMODORO_IN_PROGRESS || status === SequenceStatus.BREAK,

      isInProgress: ({ status }) => status === SequenceStatus.POMODORO_IN_PROGRESS,

      isStopped: ({ status }) => status === SequenceStatus.STOPPED,

      isBreak: ({ status }) => status === SequenceStatus.BREAK,

      isFinished: ({ status }) => status === SequenceStatus.FINISHED,

      status: ({ status }) => status,
    }),
  },

  methods: {
    ...mapActions({
      increase: 'increasePomodoriCount',
      decrease: 'decreasePomodoriCount',
    }),

    ...mapActions(['start', 'stop', 'resume', 'reset']),
  },
};
</script>

<style lang="scss" scoped>
@import "assets/styles/_colors.scss";

#app {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.pomodori-count {
    margin-bottom: 1em;
}

.timer-container {
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.title {
    font-size: 4em;
    color: $dominant-color;
}

.button-container .button {
  padding: 3px 8px;
}
</style>
