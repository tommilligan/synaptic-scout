<template>
  <svg width="600" height="500"></svg>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions } from 'vuex'

import * as d3 from 'd3'
import d3Tip from "d3-tip"
var d3CMenu = require('d3-context-menu');
var urljoin = require('url-join');
var _ = require('lodash');

d3.tip = d3Tip;
d3.contextMenu = d3CMenu(d3);

export default {
  name: 'vue-line-chart',
  data () {
    return {
      lastSubQuery: '',
      flaggedNodes: []
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
  computed: {
    ...mapState ({
      data: state => state.graph.data
    })
  },
  methods: {
    fetchSubgraph (centralNodeId) {
      this.lastSubQuery = centralNodeId
      this.addSubgraph(centralNodeId)
    },
    addNodeFlag (id) {
      this.flaggedNodes.push(id)
    },
    removeNodeFlag (id) {
      _.pull(this.flaggedNodes, id)
    },
    toggleNodeFlag (elm, d) {
      if (_.includes(this.flaggedNodes, d.props.id)) {
        this.removeNodeFlag(d.props.id)
        d3.select(elm).classed('node-flag', false)
      } else {
        this.addNodeFlag(d.props.id)
        d3.select(elm).classed('node-flag', true)
      }
    },
    startNetworkVisualisation () {

      /** Reuseable d3 functions */
      const toggleClass = (el, className) => {
        d3.select(el).classed(className, function() {
          return !d3.select(el).classed(className);
        });
      }

      var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");
      
      svg.selectAll("g").remove()

      var graph = this.data;

      var menu = [
        {
          title: (d) => {
            return d.props.label
          }
        },
        {
          divider: true
        },
        {
          title: (d) => {
            return (_.includes(this.flaggedNodes, d.props.id)) ? 'Unflag' : 'Flag'
          },
          action: (elm, d, i) => {
            this.toggleNodeFlag(elm, d)
          }
        },
        {
          title: 'Add neighbours',
          disabled: true,
          action: function(elm, d, i) {
            console.log('Not yet implemented');
          }
        },
        {
          divider: true
        },
        {
          title: 'Recenter here',
          action: (elm, d, i) => {
            this.fetchSubgraph(d.props.id)
          }
        }
      ]

      var tipLabel = d3.tip()
        .attr('class', 'd3-tip')
        .html(function(d) { return '<span>' + d.props.label + '</span>' })
        .offset([-6, 0])
      
      svg.call(tipLabel);


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
          .classed("node", true)
          .classed("node-central", (d) => {
            return d.props.id === this.lastSubQuery
          })
          .classed("node-flag", (d) => {
            return _.includes(this.flaggedNodes, d.props.id)
          })
          .on('mouseover', function(d, i) {
            tipLabel.show(d, i)
            d3.select(this).classed('node-hover', true)
          })
          .on('mouseout', function(d, i) {
            tipLabel.hide(d, i)
            d3.select(this).classed('node-hover', false)
          })
          .on('click', (d) => { 
            this.toggleNodeFlag(d3.event.target, d)
          })
          .on('contextmenu', d3.contextMenu(menu, {
            onOpen: function() {
              simulation.stop();
              tipLabel.hide()
            },
            onClose: function() {
              simulation.restart();
            }
          }))
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
    },
    ...mapActions (['addSubgraph'])
  }
}
</script>
<style lang="scss">

$border-radius-global: 4px;

$dark: rgba(0, 0, 0, 1);
$light: rgba(255, 255, 255, 1);
$accent: #f78827;
$ashen-grey: #d4d4d4;
$dolphin-grey: #f2f2f2;

/** 
* d3-tip styles 
*/

.d3-tip {

  font-family: monospace;
  line-height: 1;
  font-weight: bold;
  padding: 4px 6px;
  background: $light;
  color: $accent;
  border-radius: $border-radius-global;
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

  /* Style northward tooltips differently */
  &.n:after {
    margin: -1px 0 0 0;
    top: 100%;
    left: 0;
  }
}


/**
* d3-context-menu styles
*/

.d3-context-menu {
	position: absolute;
	display: none;
	background-color: $light;
	border-radius: $border-radius-global;

	font-family: monospace;
	font-size: 12px;
	min-width: 150px;
	border: 2px solid $ashen-grey;

	z-index:1200;

  ul {
    list-style-type: none;
    margin: 4px 0px;
    padding: 0px;
    cursor: default;

    li {
      padding: 4px 16px;
      user-select: none;
    
      &:hover {
        background-color: lighten($accent, 30%);
      }

      /*
        Header
      */
      &.is-header,
      &.is-header:hover {
	      background-color: $light;
        font-weight: bold;
        text-align: center;
      }

      /*
        Disabled
      */

      &.is-disabled,
      &.is-disabled:hover {
        background-color: $dolphin-grey;
        color: #888;
        cursor: not-allowed;
      }

      /*
        Divider
      */

      &.is-divider {
        padding: 0px 0px;
      }
    }

    hr {
      border: 0;
      height: 0;
      border-top: 1px solid $ashen-grey;
      border-bottom: 1px solid lighten($ashen-grey, 20%);
    }
  }
}

.links line {
  stroke: #999;
  stroke-opacity: 0.6;
}

svg {
  border: solid grey 1px;
}

.node {
  fill: #c893d8;
  stroke: #fff;
  stroke-width: 1.5px;

  &-central {
    fill: #f44286;
  }

  &-flag {
    stroke: #720067;
    stroke-width: 2.5px;
  }

  &-hover {
    fill: $accent;
  }
}


</style>
