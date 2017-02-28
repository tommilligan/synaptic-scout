<template>
  <div id="container"></div>
</template>

<script>
/* eslint-disable */
import * as d3 from 'd3'

const getStartedOne = {
  "nodes": [
    {
      "id": "n0",
      "label": "A node",
      "x": 0,
      "y": 0,
      "size": 3
    },
    {
      "id": "n1",
      "label": "Another node",
      "x": 3,
      "y": 1,
      "size": 2
    },
    {
      "id": "n2",
      "label": "And a last one",
      "x": 1,
      "y": 3,
      "size": 1
    }
  ],
  "edges": [
    {
      "id": "e0",
      "source": "n0",
      "target": "n1"
    },
    {
      "id": "e1",
      "source": "n1",
      "target": "n2"
    },
    {
      "id": "e2",
      "source": "n2",
      "target": "n0"
    }
  ]
}

export default {
  name: 'vue-line-chart',
  data () {
    return {
      data: getStartedOne,
      line: ''
    }
  },
  mounted () {
    this.startNetworkVisualisation()
  },
  methods: {
    startNetworkVisualisation () {
    }
  }
}
</script>
<style lang="scss">

</style>
