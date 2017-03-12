<template>
  <div id="app">
    <navigation />
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'

export default {
  name: 'app',
  components: {
    Navigation
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css?family=Ubuntu|Ubuntu+Mono');

#app {
  font-family: 'Ubuntu', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

input {
  font-family: 'Ubuntu Mono', monospace;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
