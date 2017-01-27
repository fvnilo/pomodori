<template>
  <div id="app">
    <top-menu></top-menu>

    <div class="ui main text container intro" v-if="isIdle">
      Pomodori helps you be more productive by telling you when to work and when to take a break. You only need to enter the number of pomodoro sessions you want to complete and one sitting and Pomodori will notify you when to cool down!
    </div>

    <div class="ui center aligned main container timer">
      <status-message 
        :status="status" 
        :remaining-pomodori="remainingPomodori"
        :pomodori-count="pomodoriCount">
      </status-message>

      <numeric-selector 
        class="pomodori-count" 
        v-if="isIdle || isFinished"
        :value="pomodoriCount" 
        @increase="increase"
        @decrease="decrease">  
      </numeric-selector>

      <timer 
        v-if="isActive || isStopped" 
        @time-update="handleTimeUpdate"
        :current-time="remainingTime" 
        :total-time="totalTime">
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
import StatusMessage from 'components/StatusMessage';
import Timer from 'components/Timer';
import NumericSelector from 'components/NumericSelector';

import * as SequenceStatus from 'src/const/sequenceStatus';

function requestPushPermission() {
  if (!Push.Permission.has()) {
    Push.Permission.request();
  }
}

function registerUnloadHandler(context) {
  window.addEventListener('beforeunload', (e) => {
    if (!(context.isIdle || context.isFinished)) {
      e.returnValue = 1;
    }
  });
}

export default {
  name: 'app',
  components: {
    TopMenu,
    StatusMessage,
    Timer,
    NumericSelector,
  },

  mounted() {
    requestPushPermission();
    registerUnloadHandler(this);
  },

  computed: {
    ...mapState({
      pomodoriCount: ({ pomodoriCount }) => pomodoriCount,

      remainingTime: ({ remainingTime }) => remainingTime,

      totalTime: ({ totalTime }) => totalTime,

      isIdle: ({ status }) => status === SequenceStatus.IDLE,

      isActive: ({ status }) =>
        status === SequenceStatus.POMODORO_IN_PROGRESS || status === SequenceStatus.BREAK,

      isStopped: ({ status }) => status === SequenceStatus.STOPPED,

      isFinished: ({ status }) => status === SequenceStatus.FINISHED,

      status: ({ status }) => status,

      remainingPomodori: ({ remainingPomodori }) => remainingPomodori,
    }),

    currentPomodoro: ({ pomodoriCount, remainingPomodori }) => pomodoriCount - remainingPomodori,
  },

  methods: {
    ...mapActions({
      increase: 'increasePomodoriCount',
      decrease: 'decreasePomodoriCount',
      resetPomodori: 'reset',
    }),

    ...mapActions(['start', 'stop', 'resume']),

    handleTimeUpdate(time) {
      document.title = `(${this.currentPomodoro}/${this.pomodoriCount}) ${time} - Pomodori`;
    },

    reset() {
      document.title = 'Pomodori';

      this.resetPomodori();
    },
  },
};
</script>

<style scoped>
.main.container.intro {
  padding-top: 8em;
}

.main.container.timer {
  padding-top: 5em;
}

.pomodori-count {
  padding-top: 1em;
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
