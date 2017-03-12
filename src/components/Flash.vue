<template>
  <div v-if="message">
    {{ message }} <a href="#" class="close" v-on:click.catpure="flashClear" />
  </div>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  props: [
    'message'
  ],
  methods: {
    ...mapActions([
      'flashClear'
    ])
  }
}
</script>
<style lang="scss" scoped>

div {
  overflow: hidden;
  background: #ffd1d1;
  text-align: center;
  padding: 5px;
  font-size: 0.9rem;
  font-weight: bold;
  position: relative;
}

.close {
  position: absolute;
  right: 6px;
  top: 6px;
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }

  &:before, &:after {
    position: absolute;
    right: 6px;
    content: ' ';
    height: 16px;
    width: 4px;
    background-color: #333;
  }

  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
}
</style>
