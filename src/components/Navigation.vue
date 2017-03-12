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

$accent: #f78827;

nav{
    display: inline-block;
    overflow: hidden;

  a{
    display: inline-block;
    padding: 10px 30px;
    font-weight:bold;
    color: #2c3e50;
    font-size:16px;
    text-decoration:none !important;
    line-height:1;
    transition:background-color 0.25s;
    border-bottom: 3px solid lightgrey;

    &:hover {
      background-color: #ffece2;
    }

    &:hover, &.router-link-active {
      border-bottom-color:#f78827;
    }
  }
}



</style>
