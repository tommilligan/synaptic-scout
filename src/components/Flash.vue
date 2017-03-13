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

@import "~sass-variables";

$text-color: white;

div {
  overflow: hidden;
  background: $warning-vivid;
  text-align: center;
  padding: 5px;
  font-size: $font-small;
  font-weight: bold;
  position: relative;
  color: $text-color;
}

.close {
  position: absolute;
  right: 6px;
  top: 6px;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }

  &:before, &:after {
    position: absolute;
    right: 7px;
    content: ' ';
    height: 16px;
    width: 2px;
    background-color: $text-color;
  }

  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
}
</style>
