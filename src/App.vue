<template>
  <div id="app">
    <navigation />
    <flash :message="$store.state.flash"/>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
import Flash from '@/components/Flash'

export default {
  name: 'app',
  components: {
    Navigation,
    Flash
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css?family=Ubuntu|Ubuntu+Mono');

body {
  margin: 0px;
}

h1, h2, h3, h4, h5, h6 {
  margin: 0.75rem 0;
}

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
