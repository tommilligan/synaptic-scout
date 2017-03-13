<template>
  <div>
    <form v-on:submit.prevent.capture="submitQuery">
      <input v-model="query" placeholder="dolphin name (Ripplefluke, Zap, TR82)" id="dolphinName" autocomplete="off">
    </form>
    <svg width="600" height="400"></svg>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions } from 'vuex'

import * as d3 from 'd3'
import d3Tip from "d3-tip"
var d3CMenu = require('d3-context-menu');
var urljoin = require('url-join');
var _ = require('lodash');
import axios from 'axios'

import endpoints from '../constants/endpoints'

d3.tip = d3Tip;
d3.contextMenu = d3CMenu(d3);

export default {
  name: 'vue-line-chart',
  data () {
    return {
      query: '',
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
          divider: true
        },
        {
          title: 'Show neighbours',
          action: (elm, d, i) => {
            this.addSubgraph(d.props.id)
          }
        },
        {
          title: 'Restart here',
          action: (elm, d, i) => {
            this.replaceSubgraph(d.props.id)
          }
        },
        {
          divider: true
        },
        {
          title: 'Search for neighbours',
          action: (elm, d, i) => {
            this.updateGraphWithSearch(d.props.id, this.addSubgraph)
          }
        },
        {
          title: 'Re-seed graph here',
          action: (elm, d, i) => {
            this.updateGraphWithSearch(d.props.id, this.replaceSubgraph)
          }
        }
      ]
    }
  },
  mounted () {
    this.intialiseGraph()
    this.replaceSubgraph('59')
  },
  watch: {
    graphData: function (newData) {
      this.restartGraph()
    }
  },
  computed: {
    ...mapState ({
      graphData: state => state.graph.data,
      lastSubquery: state => state.graph.lastSubquery,
      subqueried: state => state.graph.subqueried
    })
  },
  methods: {
    submitQuery () {
      this.updateGraphWithSearch(this.query, this.replaceSubgraph)
      this.query = ''
    },
    updateGraphWithSearch (search_id, thenCallback = (id) => {}) {
      const seedUrl = urljoin(endpoints.seedgraph, `?label=${search_id}`)
      console.log('Updating graph database with search ' + seedUrl)
      axios.get(seedUrl)
        .then((response) => {
          const response_id = response.data.id
          console.log(`Graph updated with node ${response_id}`)
          thenCallback(response_id)
        })
        .catch((error) => {
          console.error(error)
          this.flashMessage('Error connecting to isoprene-pumpjack API')
        })
    },
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
        .classed("node", true)
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
        .attr("r", (d) => {
          var allLinks = this.graphData.links.filter((p) => {
            return p.source == d.id || p.target == d.id
          }).length
          const base = 5
          return parseInt(allLinks/3) + base
        })
        .merge(this.node)
      this.node = this.node
        .classed("node-central", (d) => {
          return d.props.id === this.lastSubquery
        })
        .classed("node-flag", (d) => {
          return _.includes(this.flaggedNodes, d.props.id)
        })
        .classed("node-subqueried", (d) => {
          return _.includes(this.subqueried, d.props.id)
        })

      this.simulation
        .nodes(this.graphData.nodes)
        .on("tick", this.ticked)

      this.simulation
        .force("link")
        .links(this.graphData.links)

      this.simulation
        .alpha(0.3)
        .restart()
    },
    ...mapActions ([
      'addSubgraph',
      'replaceSubgraph',
      'flashMessage'
    ])
  }
}
</script>
<style lang="scss" scoped>

@import "~sass-variables";

$border-radius-global: 4px;
$light: $global-background;

input {
  font-family: 'Ubuntu Mono', monospace;
  padding: 5px;
  margin: 3px;
  border: solid 3px $ashen-grey;
  border-radius: 5px;
  transition: border 0.3s;

  &:focus, &.focus {
    border-color: $accent;
  }

  &#dolphinName {
    width: 300px;
  }
}

/** 
* d3-tip styles 
*/

.d3-tip {
  font-family: 'Ubuntu Mono', monospace;
  font-size: $font-small;
  line-height: 1;
  font-weight: bold;
  padding: 4px 6px;
  background: $light;
  color: $accent;
  border-radius: $border-radius-global;
  border: 2px solid $blackish;

  /* Creates a small triangle extender for the tooltip */
  &:after {
    box-sizing: border-box;
    display: inline;
    font-size: 10px;
    width: 100%;
    line-height: 1;
    color: $blackish;
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

	font-family: 'Ubuntu Mono', monospace;
	font-size: $font-small;
	min-width: 150px;
	border: 2px solid $accent;

	z-index:1200;

  ul {
    list-style-type: none;
    margin: $gutter-thin 0px;
    padding: 0px;
    cursor: default;

    li {
      padding: $gutter-thin $gutter;
      user-select: none;
    
      &:hover {
        background-color: $accent-light;
      }

      &.is-header,
      &.is-header:hover {
	      background-color: $light;
        font-weight: bold;
        text-align: center;
      }

      &.is-disabled,
      &.is-disabled:hover {
        background-color: $dolphin-grey;
        color: $auditor-grey;
        cursor: not-allowed;
      }

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
  stroke: $auditor-grey;
}

svg {
  border: 2px solid $ashen-grey;
}

.node {
  fill: #cb6fe8;
  stroke: $global-background;
  stroke-width: 1.5px;

  &-subqueried {
    fill: $pale-grey;
  }

  &-central {
    fill: #ff0766;
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
