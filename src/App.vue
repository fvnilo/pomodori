<template>
  <div id="app">
    <div class="ui fixed inverted menu">
      <div class="ui container">
        <span class="header item">
          Pomodori
        </span>
      </div>
      <div class="right menu">
        <div class="ui right item">
          <i class="help icon"></i>
        </div>
      </div>
    </div>
      <div class="ui center aligned main container">
        <h2 class="ui header stopped" v-if="isFinished">Yay! You Finished Your {{ pomodoriCount }} Pomodori</h2>
        <h2 class="ui header idle" v-if="isIdle || isFinished">Choose How Many Pomodori You Want To Complete</h2>
        <h2 class="ui header active" v-if="isInProgress">Pomodoro In Progress</h2>
        <h2 class="ui header pause" v-if="isBreak">You Deserve A Break!</h2>
        <h2 class="ui header stopped" v-if="isStopped">Need A (Longer) Break?</h2>

        <numeric-selector class="pomodori-count" 
          v-if="isIdle || isFinished"
          :value="pomodoriCount" 
          @increase="increase"
          @decrease="decrease">  
        </numeric-selector>

        <timer v-if="isActive || isStopped" :value="remainingTime"></timer>

        <div class="button-container">
          <button class="ui icon button huge" v-if="isIdle || isFinished" @click="start()">
            <i class="play icon"></i> Start
          </button>
          <button class="ui icon button huge" v-if="isActive" @click="stop()">
            <i class="pause icon"></i> Pause
          </button>
          <button class="ui icon button huge" v-if="isStopped" @click="resume()">
            <i class="pause icon"></i> Resume
          </button>
          <button class="ui icon button huge" v-if="isStopped" @click="reset()">
            <i class="refresh icon"></i> Reset
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
.main.container {
  padding-top: 13em;
}
</style>
