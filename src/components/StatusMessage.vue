<template>
  <div id="status-message">
    <h2 class="ui header stopped" v-if="isFinished">Congratulations! You Completed {{ pomodoriCount }} Pomodori!</h2>
    <h2 class="ui header idle" v-if="isIdle || isFinished">Choose How Many Pomodori You Want To Complete</h2>
    <h2 class="ui header in-progress" v-if="isInProgress">Pomodoro In Progress</h2>
    <h2 class="ui header pause" v-if="isBreak">You Deserve A Break!</h2>
    <h2 class="ui header stopped" v-if="isStopped">Need A (Longer) Break?</h2>
    <h3 class="ui header remaining" v-if="!(isIdle || isFinished)">{{ remainingPomodori }} Pomodori Remaining</h3>
  </div>
</template>

<script>
import * as SequenceStatus from 'src/const/sequenceStatus';

export default {
  name: 'status-message',

  props: {
    status: {
      type: String,
      required: true,
    },

    remainingPomodori: {
      type: Number,
      required: true,
    },

    pomodoriCount: {
      type: Number,
      required: true,
    },
  },

  computed: {
    isIdle: ({ status }) => status === SequenceStatus.IDLE,

    isInProgress: ({ status }) => status === SequenceStatus.POMODORO_IN_PROGRESS,

    isStopped: ({ status }) => status === SequenceStatus.STOPPED,

    isBreak: ({ status }) => status === SequenceStatus.BREAK,

    isFinished: ({ status }) => status === SequenceStatus.FINISHED,
  },
};
</script>
