<template>
  <div id="app">
    <top-menu :enable-navigation="enableNavigation"></top-menu>
    <router-view></router-view>

    <div class="ui inverted vertical footer segment fixed">
      <div class="ui center aligned container">
        Keep Calm And Start Pomodoroing
      </div>
    </div>
</template>

<script>
import Push from 'push.js';

import { mapState } from 'vuex';

import TopMenu from 'components/TopMenu';

import * as SequenceStatus from 'src/const/sequenceStatus';

function requestPushPermission() {
  if (!Push.Permission.has()) {
    Push.Permission.request();
  }
}

export default {
  name: 'app',
  components: { TopMenu },
  mounted() {
    requestPushPermission();
  },

  computed: mapState({
    enableNavigation: ({ status }) =>
      status !== SequenceStatus.POMODORO_IN_PROGRESS && status !== SequenceStatus.BREAK,
  }),
};
</script>

<style>
.page-content {
  padding-top: 8em;
}
.ui.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
