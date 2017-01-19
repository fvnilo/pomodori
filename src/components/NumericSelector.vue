<template>
  <div class="numeric-selector">
    <a class="decrease" @click="decrease()">-</a>
    <input type="number" min="0" :value="value" disabled>
    <a class="increase" @click="increase()">+</a>
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
      if (this.value > 0) {
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
.numeric-selector {
  display: flex;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

input {
  text-align: center;

  margin: 0 0.5em;
  font-size: 3.5em;
  font-weight: 200;

  width: 2em;
}

a {
  font-size: 3.5em;
}
</style>
