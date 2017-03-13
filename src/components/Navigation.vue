<template>
  <div>
    <nav>
      <router-link exact to="/">Explore</router-link>
      <router-link exact to="/about">About</router-link>
    </nav>
  </div>
</template>
<script>

export default {
  data () {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>

@import "~sass-variables";

nav{
    display: inline-block;
    overflow: hidden;

  a{
    display: inline-block;
    padding: 10px 30px;
    font-weight: bold;
    color: $blackish;
    font-size: $font-large;
    text-decoration:none !important;
    line-height: 1;
    transition: all 0.25s;
    border-bottom: 3px solid $ashen-grey;

    &:hover {
      background-color: $accent-light;
    }

    &:hover, &.router-link-active {
      border-bottom-color: $accent;
    }
  }
}

</style>
