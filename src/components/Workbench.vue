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
      flaggedNodes: [],
      rootElement: undefined,
      simulation: undefined,
      node: undefined,
      link: undefined,
      tipLabel: d3.tip()
        .attr('class', 'd3-tip')
        .html((d) => { return '<span>' + d.props.label + '</span>' })
        .offset([-6, 0]),
      menu: [
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
          action: (elm, d, i) => {
            this.addSubgraph(d.props.id)
          }
        },
        {
          divider: true
        },
        {
          title: 'Recenter here',
          action: (elm, d, i) => {
            this.replaceSubgraph(d.props.id)
          }
        }
      ]
    }
  },
  mounted () {
    this.intialiseGraph()
    this.replaceSubgraph('14')
  },
  watch: {
    graphData: function (newData) {
      this.restartGraph()
    }
  },
  computed: {
    ...mapState ({
      graphData: state => state.graph.data,
      lastSubquery: state => state.graph.lastSubquery
    })
  },
  methods: {
    intialiseGraph () {
      this.rootElement = d3.select("svg")
      this.rootElement.call(this.tipLabel)
      this.simulation = d3.forceSimulation()
        .force("link", d3.forceLink()
          .id(d => d.id))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(
          this.rootElement.attr("width") / 2,
          this.rootElement.attr("height") / 2
        ))
      this.link = this.rootElement.append("g")
        .attr("class", "links")
        .selectAll("line")
      this.node = this.rootElement.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
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
    ticked () {
      this.link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y)
      this.node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
    },
    dragstarted (d) {
      if (!d3.event.active) this.simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    },
    dragged (d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    },
    dragended (d) {
      if (!d3.event.active) this.simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    },
    restartGraph () {
      /** Reuseable d3 functions */
      const toggleClass = (el, className) => {
        d3.select(el).classed(className, () => {
          return !d3.select(el).classed(className);
        });
      }

      this.simulation.stop()
      
      // this.rootElement.selectAll("g").remove()
      this.link = this.link.data(this.graphData.links, d => d.id)
      this.link.exit().remove()
      this.link = this.link.enter()
        .append("line")
        .attr("stroke-width", 1)
        .merge(this.link)

      this.node = this.node.data(this.graphData.nodes, d => d.id)
      this.node.exit().remove()
      this.node = this.node.enter()
        .append("circle")
        .attr("r", (d) => {
          const allLinks = this.graphData.links.filter((p) => {
            return p.source == d.id || p.target == d.id
          }).length
          const base = 5
          return parseInt(allLinks/3) + base
        })
        .attr("cx", 30)
        .attr("cy", 60)
        .classed("node", true)
        .classed("node-central", (d) => {
          return d.props.id === this.lastSubquery
        })
        .classed("node-flag", (d) => {
          return _.includes(this.flaggedNodes, d.props.id)
        })
        .on('mouseover', (d, i) => {
          this.tipLabel.show(d, i)
          d3.select(d3.event.target).classed('node-hover', true)
        })
        .on('mouseout', (d, i) => {
          this.tipLabel.hide(d, i)
          d3.select(d3.event.target).classed('node-hover', false)
        })
        .on('click', (d) => {
          this.toggleNodeFlag(d3.event.target, d)
        })
        .on('contextmenu', d3.contextMenu(this.menu, {
          onOpen: () => {
            this.simulation.stop();
            this.tipLabel.hide()
          },
          onClose: () => {
            this.simulation.restart();
          }
        }))
        .call(d3.drag()
          .on("start", this.dragstarted)
          .on("drag", this.dragged)
          .on("end", this.dragended))
        .merge(this.node)

      this.simulation
        .nodes(this.graphData.nodes)
        .on("tick", this.ticked)

      this.simulation
        .force("link")
        .links(this.graphData.links)

      this.simulation
        .alpha(1)
        .restart()
    },
    ...mapActions (['addSubgraph', 'replaceSubgraph'])
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
