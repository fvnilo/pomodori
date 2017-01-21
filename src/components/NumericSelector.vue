<template>
  <div class="numeric-selector">
    <a class="decrease" @click="decrease()">
      <i class="caret left huge icon"></i>
    </a>
    <div class="value">
      <span>{{ value }}</span>  
    </div>
    <a class="increase" @click="increase()">
      <i class="caret right huge icon"></i>
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
.numeric-selector {
  display: flex;
  justify-content: center;
}

.value {
  font-size: 3em;
  color: rgba(0, 0, 0, 0.6);
  text-align: center;
  vertical-align: middle;
  line-height: 1.3em;
}

a {
  cursor: pointer;
}
</style>
