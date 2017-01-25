import Push from 'push.js';

import * as MutationTypes from 'src/store/mutationTypes';
import * as SequenceStatus from 'src/const/sequenceStatus';
import * as NotificationMessages from 'src/const/notificationMessages';

function showNotification(message) {
  if (Push.Permission.has()) {
    return Push.create('Pomodori', {
      body: message,
      timeout: 5000,
    });
  }

  return Promise.resolve();
}

function runSequence(commit, state) {
  return setInterval(() => {
    if (state.remainingTime > 0) {
      commit(MutationTypes.TICK);
    } else if (state.status === SequenceStatus.POMODORO_IN_PROGRESS) {
      showNotification(NotificationMessages.BREAK_STARTING)
        .then(() => commit(MutationTypes.START_BREAK));
    } else if (state.remainingPomodori > 0) {
      showNotification(NotificationMessages.POMODORO_STARTING)
        .then(() => commit(MutationTypes.START_NEXT_POMODORO));
    } else {
      showNotification(NotificationMessages.POMODORI_DONE)
        .then(() => commit(MutationTypes.END));
    }
  }, 1000);
}

function commitRunRequence(commit, state, mutationType) {
  const interval = runSequence(commit, state);

  commit(mutationType, interval);
}

export const increasePomodoriCount = ({ commit }) => commit(MutationTypes.INCREASE_POMODORI_COUNT);

export const decreasePomodoriCount = ({ commit }) => commit(MutationTypes.DECREASE_POMODORI_COUNT);

export const start = ({ commit, state }) => {
  showNotification(NotificationMessages.START_POMODORI)
    .then(() => commitRunRequence(commit, state, MutationTypes.START));
};

export const stop = ({ commit }) => commit(MutationTypes.STOP);

export const reset = ({ commit }) => commit(MutationTypes.RESET);

export const resume = ({ commit, state }) => {
  showNotification(NotificationMessages.RESUME_POMODORI)
    .then(() => commitRunRequence(commit, state, MutationTypes.RESUME));
};
