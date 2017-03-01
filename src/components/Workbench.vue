<template>
  <svg width="600" height="500"></svg>
</template>

<script>
/* eslint-disable */
import * as d3 from 'd3'

const graph = {
  "nodes": [
    {
      "id": "0",
      "label": "Beak"
    },
    {
      "id": "1",
      "label": "Beescratch"
    },
    {
      "id": "2",
      "label": "Bumper"
    },
    {
      "id": "3",
      "label": "CCL"
    },
    {
      "id": "4",
      "label": "Cross"
    },
    {
      "id": "5",
      "label": "DN16"
    },
    {
      "id": "6",
      "label": "DN21"
    },
    {
      "id": "7",
      "label": "DN63"
    },
    {
      "id": "8",
      "label": "Double"
    },
    {
      "id": "9",
      "label": "Feather"
    },
    {
      "id": "10",
      "label": "Fish"
    },
    {
      "id": "11",
      "label": "Five"
    },
    {
      "id": "12",
      "label": "Fork"
    },
    {
      "id": "13",
      "label": "Gallatin"
    },
    {
      "id": "14",
      "label": "Grin"
    },
    {
      "id": "15",
      "label": "Haecksel"
    },
    {
      "id": "16",
      "label": "Hook"
    },
    {
      "id": "17",
      "label": "Jet"
    },
    {
      "id": "18",
      "label": "Jonah"
    },
    {
      "id": "19",
      "label": "Knit"
    },
    {
      "id": "20",
      "label": "Kringel"
    },
    {
      "id": "21",
      "label": "MN105"
    },
    {
      "id": "22",
      "label": "MN23"
    },
    {
      "id": "23",
      "label": "MN60"
    },
    {
      "id": "24",
      "label": "MN83"
    },
    {
      "id": "25",
      "label": "Mus"
    },
    {
      "id": "26",
      "label": "Notch"
    },
    {
      "id": "27",
      "label": "Number1"
    },
    {
      "id": "28",
      "label": "Oscar"
    },
    {
      "id": "29",
      "label": "Patchback"
    },
    {
      "id": "30",
      "label": "PL"
    },
    {
      "id": "31",
      "label": "Quasi"
    },
    {
      "id": "32",
      "label": "Ripplefluke"
    },
    {
      "id": "33",
      "label": "Scabs"
    },
    {
      "id": "34",
      "label": "Shmuddel"
    },
    {
      "id": "35",
      "label": "SMN5"
    },
    {
      "id": "36",
      "label": "SN100"
    },
    {
      "id": "37",
      "label": "SN4"
    },
    {
      "id": "38",
      "label": "SN63"
    },
    {
      "id": "39",
      "label": "SN89"
    },
    {
      "id": "40",
      "label": "SN9"
    },
    {
      "id": "41",
      "label": "SN90"
    },
    {
      "id": "42",
      "label": "SN96"
    },
    {
      "id": "43",
      "label": "Stripes"
    },
    {
      "id": "44",
      "label": "Thumper"
    },
    {
      "id": "45",
      "label": "Topless"
    },
    {
      "id": "46",
      "label": "TR120"
    },
    {
      "id": "47",
      "label": "TR77"
    },
    {
      "id": "48",
      "label": "TR82"
    },
    {
      "id": "49",
      "label": "TR88"
    },
    {
      "id": "50",
      "label": "TR99"
    },
    {
      "id": "51",
      "label": "Trigger"
    },
    {
      "id": "52",
      "label": "TSN103"
    },
    {
      "id": "53",
      "label": "TSN83"
    },
    {
      "id": "54",
      "label": "Upbang"
    },
    {
      "id": "55",
      "label": "Vau"
    },
    {
      "id": "56",
      "label": "Wave"
    },
    {
      "id": "57",
      "label": "Web"
    },
    {
      "id": "58",
      "label": "Whitetip"
    },
    {
      "id": "59",
      "label": "Zap"
    },
    {
      "id": "60",
      "label": "Zig"
    },
    {
      "id": "61",
      "label": "Zipfel"
    }
  ],
  "links": [
    {
      "source": "8",
      "target": "3"
    },
    {
      "source": "9",
      "target": "5"
    },
    {
      "source": "9",
      "target": "6"
    },
    {
      "source": "10",
      "target": "0"
    },
    {
      "source": "10",
      "target": "2"
    },
    {
      "source": "13",
      "target": "5"
    },
    {
      "source": "13",
      "target": "6"
    },
    {
      "source": "13",
      "target": "9"
    },
    {
      "source": "14",
      "target": "0"
    },
    {
      "source": "14",
      "target": "3"
    },
    {
      "source": "15",
      "target": "0"
    },
    {
      "source": "16",
      "target": "14"
    },
    {
      "source": "17",
      "target": "1"
    },
    {
      "source": "17",
      "target": "6"
    },
    {
      "source": "17",
      "target": "9"
    },
    {
      "source": "17",
      "target": "13"
    },
    {
      "source": "18",
      "target": "15"
    },
    {
      "source": "19",
      "target": "1"
    },
    {
      "source": "19",
      "target": "7"
    },
    {
      "source": "20",
      "target": "8"
    },
    {
      "source": "20",
      "target": "16"
    },
    {
      "source": "20",
      "target": "18"
    },
    {
      "source": "21",
      "target": "18"
    },
    {
      "source": "22",
      "target": "17"
    },
    {
      "source": "24",
      "target": "14"
    },
    {
      "source": "24",
      "target": "15"
    },
    {
      "source": "24",
      "target": "18"
    },
    {
      "source": "25",
      "target": "17"
    },
    {
      "source": "26",
      "target": "1"
    },
    {
      "source": "26",
      "target": "25"
    },
    {
      "source": "27",
      "target": "1"
    },
    {
      "source": "27",
      "target": "7"
    },
    {
      "source": "27",
      "target": "17"
    },
    {
      "source": "27",
      "target": "25"
    },
    {
      "source": "27",
      "target": "26"
    },
    {
      "source": "28",
      "target": "1"
    },
    {
      "source": "28",
      "target": "8"
    },
    {
      "source": "28",
      "target": "20"
    },
    {
      "source": "29",
      "target": "10"
    },
    {
      "source": "29",
      "target": "18"
    },
    {
      "source": "29",
      "target": "21"
    },
    {
      "source": "29",
      "target": "24"
    },
    {
      "source": "30",
      "target": "7"
    },
    {
      "source": "30",
      "target": "19"
    },
    {
      "source": "30",
      "target": "28"
    },
    {
      "source": "31",
      "target": "17"
    },
    {
      "source": "32",
      "target": "9"
    },
    {
      "source": "32",
      "target": "13"
    },
    {
      "source": "33",
      "target": "12"
    },
    {
      "source": "33",
      "target": "14"
    },
    {
      "source": "33",
      "target": "16"
    },
    {
      "source": "33",
      "target": "21"
    },
    {
      "source": "34",
      "target": "14"
    },
    {
      "source": "34",
      "target": "33"
    },
    {
      "source": "35",
      "target": "29"
    },
    {
      "source": "36",
      "target": "1"
    },
    {
      "source": "36",
      "target": "20"
    },
    {
      "source": "36",
      "target": "23"
    },
    {
      "source": "37",
      "target": "8"
    },
    {
      "source": "37",
      "target": "14"
    },
    {
      "source": "37",
      "target": "16"
    },
    {
      "source": "37",
      "target": "21"
    },
    {
      "source": "37",
      "target": "33"
    },
    {
      "source": "37",
      "target": "34"
    },
    {
      "source": "37",
      "target": "36"
    },
    {
      "source": "38",
      "target": "14"
    },
    {
      "source": "38",
      "target": "16"
    },
    {
      "source": "38",
      "target": "20"
    },
    {
      "source": "38",
      "target": "33"
    },
    {
      "source": "39",
      "target": "36"
    },
    {
      "source": "40",
      "target": "0"
    },
    {
      "source": "40",
      "target": "7"
    },
    {
      "source": "40",
      "target": "14"
    },
    {
      "source": "40",
      "target": "15"
    },
    {
      "source": "40",
      "target": "33"
    },
    {
      "source": "40",
      "target": "36"
    },
    {
      "source": "40",
      "target": "37"
    },
    {
      "source": "41",
      "target": "1"
    },
    {
      "source": "41",
      "target": "9"
    },
    {
      "source": "41",
      "target": "13"
    },
    {
      "source": "42",
      "target": "0"
    },
    {
      "source": "42",
      "target": "2"
    },
    {
      "source": "42",
      "target": "10"
    },
    {
      "source": "42",
      "target": "30"
    },
    {
      "source": "43",
      "target": "14"
    },
    {
      "source": "43",
      "target": "29"
    },
    {
      "source": "43",
      "target": "33"
    },
    {
      "source": "43",
      "target": "37"
    },
    {
      "source": "43",
      "target": "38"
    },
    {
      "source": "44",
      "target": "2"
    },
    {
      "source": "44",
      "target": "20"
    },
    {
      "source": "44",
      "target": "34"
    },
    {
      "source": "44",
      "target": "38"
    },
    {
      "source": "45",
      "target": "8"
    },
    {
      "source": "45",
      "target": "15"
    },
    {
      "source": "45",
      "target": "18"
    },
    {
      "source": "45",
      "target": "21"
    },
    {
      "source": "45",
      "target": "23"
    },
    {
      "source": "45",
      "target": "24"
    },
    {
      "source": "45",
      "target": "29"
    },
    {
      "source": "45",
      "target": "37"
    },
    {
      "source": "46",
      "target": "43"
    },
    {
      "source": "47",
      "target": "0"
    },
    {
      "source": "47",
      "target": "10"
    },
    {
      "source": "47",
      "target": "20"
    },
    {
      "source": "47",
      "target": "28"
    },
    {
      "source": "47",
      "target": "30"
    },
    {
      "source": "47",
      "target": "42"
    },
    {
      "source": "49",
      "target": "34"
    },
    {
      "source": "49",
      "target": "46"
    },
    {
      "source": "50",
      "target": "14"
    },
    {
      "source": "50",
      "target": "16"
    },
    {
      "source": "50",
      "target": "20"
    },
    {
      "source": "50",
      "target": "33"
    },
    {
      "source": "50",
      "target": "42"
    },
    {
      "source": "50",
      "target": "45"
    },
    {
      "source": "51",
      "target": "4"
    },
    {
      "source": "51",
      "target": "11"
    },
    {
      "source": "51",
      "target": "18"
    },
    {
      "source": "51",
      "target": "21"
    },
    {
      "source": "51",
      "target": "23"
    },
    {
      "source": "51",
      "target": "24"
    },
    {
      "source": "51",
      "target": "29"
    },
    {
      "source": "51",
      "target": "45"
    },
    {
      "source": "51",
      "target": "50"
    },
    {
      "source": "52",
      "target": "14"
    },
    {
      "source": "52",
      "target": "29"
    },
    {
      "source": "52",
      "target": "38"
    },
    {
      "source": "52",
      "target": "40"
    },
    {
      "source": "53",
      "target": "43"
    },
    {
      "source": "54",
      "target": "1"
    },
    {
      "source": "54",
      "target": "6"
    },
    {
      "source": "54",
      "target": "7"
    },
    {
      "source": "54",
      "target": "13"
    },
    {
      "source": "54",
      "target": "19"
    },
    {
      "source": "54",
      "target": "41"
    },
    {
      "source": "55",
      "target": "15"
    },
    {
      "source": "55",
      "target": "51"
    },
    {
      "source": "56",
      "target": "5"
    },
    {
      "source": "56",
      "target": "6"
    },
    {
      "source": "57",
      "target": "5"
    },
    {
      "source": "57",
      "target": "6"
    },
    {
      "source": "57",
      "target": "9"
    },
    {
      "source": "57",
      "target": "13"
    },
    {
      "source": "57",
      "target": "17"
    },
    {
      "source": "57",
      "target": "39"
    },
    {
      "source": "57",
      "target": "41"
    },
    {
      "source": "57",
      "target": "48"
    },
    {
      "source": "57",
      "target": "54"
    },
    {
      "source": "58",
      "target": "38"
    },
    {
      "source": "59",
      "target": "3"
    },
    {
      "source": "59",
      "target": "8"
    },
    {
      "source": "59",
      "target": "15"
    },
    {
      "source": "59",
      "target": "36"
    },
    {
      "source": "59",
      "target": "45"
    },
    {
      "source": "60",
      "target": "32"
    },
    {
      "source": "61",
      "target": "2"
    },
    {
      "source": "61",
      "target": "37"
    },
    {
      "source": "61",
      "target": "53"
    }
  ]
}


export default {
  name: 'vue-line-chart',
  data () {
    return {
      data: graph,
      line: ''
    }
  },
  mounted () {
    this.startNetworkVisualisation()
  },
  methods: {
    startNetworkVisualisation () {
      var svg = d3.select("svg"),
          width = +svg.attr("width"),
          height = +svg.attr("height");

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
          .attr("fill", "#c893d8")
          .call(d3.drag()
              .on("start", dragstarted)
              .on("drag", dragged)
              .on("end", dragended));

      node.append("title")
          .text(function(d) { return d.id; });

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

</style>
