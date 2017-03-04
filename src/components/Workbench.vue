<template>
  <svg width="600" height="500"></svg>
</template>

<script>
/* eslint-disable */
import * as d3 from 'd3'
import d3Tip from "d3-tip"
import axios from 'axios'
var urljoin = require('url-join');

d3.tip = d3Tip;

const apiBase = process.env.SYNAPTIC_SCOUT_BACKEND_URL || 'http://localhost:5000/'
const fullUrl = urljoin(apiBase, 'fullgraph');
const partUrl = urljoin(apiBase, 'subgraph');


export default {
  name: 'vue-line-chart',
  data () {
    return {
      data: {
        nodes: [],
        links: []
      },
      lastSubQuery: ''
    }
  },
  mounted () {
    this.fetchSubgraph('14')
  },
  watch: {
    data: function (newData) {
      this.startNetworkVisualisation()
    }
  },
  methods: {
    fetchData: function (dataUrl) {
      axios.get(dataUrl)
        .then((response) => {
          this.data = response.data
        })
        .catch((error) => {
          console.error(error)
        })
    },
    fetchSubgraph (centralNodeId) {
      this.lastSubQuery = centralNodeId
      this.fetchData(urljoin(partUrl, centralNodeId))
    },
    startNetworkVisualisation () {
      var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");
      svg.selectAll("g").remove()

      var graph = this.data;

      var tipLabel = d3.tip()
        .attr('class', 'd3-tip')
        .html(function(d) { return '<span>' + d.props.label + '</span>' })
        .offset([-6, 0])
      
      svg.call(tipLabel);

      var color = d3.scaleOrdinal(d3.schemeCategory20);

      var simulation = d3.forceSimulation()
          .force("link", d3.forceLink().id(function(d) { return d.id; }))
          .force("charge", d3.forceManyBody())
          .force("center", d3.forceCenter(width / 2, height / 2));

      var link = svg.append("g")
          .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
          .attr("stroke-width", 1);

      var node = svg.append("g")
          .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
          .attr("r", function(d) {
            const alllinks = graph.links.filter(function(p) {
              return p.source == d.id || p.target == d.id
            }).length
            const base = 3
            return parseInt(alllinks/2) + base
          })
          .attr("fill", (d) => {
            return (d.props.id === this.lastSubQuery) ? "#f44286" : "#c893d8"
          })
          .on('mouseover', tipLabel.show)
          .on('mouseout', tipLabel.hide)
          .on('click', (d) => { 
            tipLabel.hide()
            this.fetchSubgraph(d.props.id)
          })
          .call(d3.drag()
              .on("start", dragstarted)
              .on("drag", dragged)
              .on("end", dragended));

      simulation
          .nodes(graph.nodes)
          .on("tick", ticked);

      simulation.force("link")
          .links(graph.links);

      function ticked() {
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
        }

      function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }

      function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
    }
  }
}
</script>
<style lang="scss">

.links line {
  stroke: #999;
  stroke-opacity: 0.6;
}

.nodes circle {
  stroke: #fff;
  stroke-width: 1.5px;
}

svg {
  border: solid grey 1px;
}

.d3-tip {
  $dark: rgba(0, 0, 0, 0.6);
  $light: rgba(255, 255, 255, 0.9);
  $accent: #f78827;

  font-family: monospace;
  line-height: 1;
  font-weight: bold;
  padding: 6px;
  background: $light;
  color: $accent;
  border-radius: 4px;
  border: 2px solid $dark;

  /* Creates a small triangle extender for the tooltip */
  &:after {
    box-sizing: border-box;
    display: inline;
    font-size: 10px;
    width: 100%;
    line-height: 1;
    color: $dark;
    content: "\25BC";
    position: absolute;
    text-align: center;
  }
}

/* Style northward tooltips differently */
.d3-tip.n:after {
  margin: -1px 0 0 0;
  top: 100%;
  left: 0;
}

</style>
