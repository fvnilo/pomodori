<template>
  <div class="ui fixed inverted menu">
    <div class="ui container">
      <span class="header item">
        <router-link to="/" class="link">Pomodori</router-link>
      </span>
    </div>
    <div class="right menu">
      <div class="ui right item">
        <a href="https://github.com/nylo-andry/pomodori" target="_blank">
          <i class="github link large icon"></i>
        </a>
      </div>
      <div class="ui right item" v-if="enableNavigation">
        <router-link to="/help">
          <i class="help link large icon"></i>
        </router-link>
      </div>
      <div class="ui right disabled item" v-if="!enableNavigation">
        <i class="help large icon"></i>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'top-menu',
    props: ['enableNavigation'],
  };
</script>
