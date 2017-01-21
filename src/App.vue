<template>
  <div id="app">
    <top-menu></top-menu>

    <div class="ui main text container intro" v-if="isIdle">
      Pomodori helps you be more productive by telling you when to work and when to take a break. You only need to enter the number of pomodoro sessions you want to complete and one sitting and Pomodori will notify you when to cool down!
    </div>

    <div class="ui center aligned main container timer">
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

      <timer v-if="isActive || isStopped" :current-time="remainingTime" :total-time="totalTime">
      </timer>

      <div class="buttons">
        <button class="ui icon button huge" v-if="isIdle || isFinished" @click="start()">
          <i class="play icon"></i> Start
        </button>
        <button class="ui icon button huge" v-if="isActive" @click="stop()">
          <i class="pause icon"></i> Pause
        </button>
        <button class="ui icon button huge" v-if="isStopped" @click="resume()">
          <i class="play icon"></i> Resume
        </button>
        <button class="ui icon button huge" v-if="isStopped" @click="reset()">
          <i class="refresh icon"></i> Reset
        </button>  
      </div>
    </div>

    <div class="ui inverted vertical footer segment fixed">
      <div class="ui center aligned container">
        Keep Calm And Start Pomodoroing
      </div>
    </div>
  </div>
</template>

<script>
import Push from 'push.js';

import { mapState, mapActions } from 'vuex';

import TopMenu from 'components/TopMenu';
import Timer from 'components/Timer';
import NumericSelector from 'components/NumericSelector';

import * as SequenceStatus from 'src/const/sequenceStatus';

export default {
  name: 'app',
  components: {
    TopMenu,
    Timer,
    NumericSelector,
  },

  mounted() {
    if (!Push.Permission.has()) {
      Push.Permission.request();
    }
  },

  computed: {
    ...mapState({
      pomodoriCount: ({ pomodoriCount }) => pomodoriCount,

      remainingTime: ({ remainingTime }) => remainingTime,

      totalTime: ({ totalTime }) => totalTime,

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
.main.container.intro {
  padding-top: 8em;
}
.main.container.timer {
  padding-top: 5em;
}
.buttons {
  padding-top: 1em;
}
.ui.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
