<template>
  <div id="app">
    <indicator-bar :loading="$store.state.loading" />
    <navigation />
    <flash :message="$store.state.flash" />
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
import Flash from '@/components/Flash'
import IndicatorBar from '@/components/IndicatorBar'

export default {
  name: 'app',
  components: {
    Navigation,
    Flash,
    IndicatorBar
  }
}
</script>

<style>
/* Ubuntu */
/* ubuntu-regular - latin */
@font-face {
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 400;
  src: local('Ubuntu'),
       url('./assets/fonts/ubuntu-v9-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/ubuntu-v9-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* ubuntu-italic - latin */
@font-face {
  font-family: 'Ubuntu';
  font-style: italic;
  font-weight: 400;
  src: local('Ubuntu Italic'), local('Ubuntu-Italic'),
       url('./assets/fonts/ubuntu-v9-latin-italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/ubuntu-v9-latin-italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* ubuntu-700 - latin */
@font-face {
  font-family: 'Ubuntu';
  font-style: normal;
  font-weight: 700;
  src: local('Ubuntu Bold'), local('Ubuntu-Bold'),
       url('./assets/fonts/ubuntu-v9-latin-700.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/ubuntu-v9-latin-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* ubuntu-700italic - latin */
@font-face {
  font-family: 'Ubuntu';
  font-style: italic;
  font-weight: 700;
  src: local('Ubuntu Bold Italic'), local('Ubuntu-BoldItalic'),
       url('./assets/fonts/ubuntu-v9-latin-700italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/ubuntu-v9-latin-700italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}

/* Ubuntu Mono */
/* ubuntu-mono-regular - latin */
@font-face {
  font-family: 'Ubuntu Mono';
  font-style: normal;
  font-weight: 400;
  src: local('Ubuntu Mono'), local('UbuntuMono-Regular'),
       url('./assets/fonts/ubuntu-mono-v6-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/ubuntu-mono-v6-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* ubuntu-mono-italic - latin */
@font-face {
  font-family: 'Ubuntu Mono';
  font-style: italic;
  font-weight: 400;
  src: local('Ubuntu Mono Italic'), local('UbuntuMono-Italic'),
       url('./assets/fonts/ubuntu-mono-v6-latin-italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/ubuntu-mono-v6-latin-italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* ubuntu-mono-700 - latin */
@font-face {
  font-family: 'Ubuntu Mono';
  font-style: normal;
  font-weight: 700;
  src: local('Ubuntu Mono Bold'), local('UbuntuMono-Bold'),
       url('./assets/fonts/ubuntu-mono-v6-latin-700.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/ubuntu-mono-v6-latin-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
/* ubuntu-mono-700italic - latin */
@font-face {
  font-family: 'Ubuntu Mono';
  font-style: italic;
  font-weight: 700;
  src: local('Ubuntu Mono Bold Italic'), local('UbuntuMono-BoldItalic'),
       url('./assets/fonts/ubuntu-mono-v6-latin-700italic.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('./assets/fonts/ubuntu-mono-v6-latin-700italic.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}

body {
  margin: 0px;
}

#app {
  font-family: 'Ubuntu', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
