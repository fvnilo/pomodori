<template>
  <div class="numeric-selector">
    <a class="decrease" @click="decrease()">
      <i class="minus big icon"></i>
    </a>
    <div class="ui massive input">
      <input type="number" min="1" :value="value" disabled>  
    </div>
    <a class="increase" @click="increase()">
      <i class="plus big icon"></i>
    </a>
  </div>
    
</template>

<script>
export default {
  name: 'numeric-selector',

  props: {
    value: {
      required: true,
      type: Number,
    },
  },

  methods: {
    decrease() {
      if (this.value > 1) {
        this.$emit('decrease');
      }
    },

    increase() {
      this.$emit('increase');
    },
  },
};
</script>

<style scoped>
.input {
  margin: 0.5em 0;
  width: 4.5em;
}

a {
  cursor: pointer;
}
</style>
