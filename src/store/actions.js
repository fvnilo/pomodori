import * as MutationTypes from 'src/store/mutationTypes';
import * as SequenceStatus from 'src/const/sequenceStatus';

function runSequence(commit, state) {
  return setInterval(() => {
    if (state.remainingTime > 0) {
      commit(MutationTypes.TICK);
    } else if (state.status === SequenceStatus.POMODORO_IN_PROGRESS) {
      commit(MutationTypes.START_BREAK);
    } else if (state.pomodoriLeft > 0) {
      commit(MutationTypes.START_NEXT_POMODORO);
    } else {
      commit(MutationTypes.END);
    }
  }, 1000);
}

function commitRunRequence(commit, state, mutationType) {
  const interval = runSequence(commit, state);

  commit(mutationType, interval);
}

export const increasePomodoriCount = ({ commit }) => commit(MutationTypes.INCREASE_POMODORI_COUNT);

export const decreasePomodoriCount = ({ commit }) => commit(MutationTypes.DECREASE_POMODORI_COUNT);

export const start = ({ commit, state }) => commitRunRequence(commit, state, MutationTypes.START);

export const stop = ({ commit }) => commit(MutationTypes.STOP);

export const reset = ({ commit }) => commit(MutationTypes.RESET);

export const resume = ({ commit, state }) => commitRunRequence(commit, state, MutationTypes.RESUME);
