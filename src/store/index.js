import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
const urljoin = require('url-join')
const _ = require('lodash')

import endpoints from '../constants/endpoints'

Vue.use(Vuex)

// root state object.
const state = {
  graph: {
    data: {
      nodes: [],
      links: []
    },
    flaggedNodes: [],
    lastSubquery: '',
    fullyLoaded: []
  }
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  mergeGraphData (state, newData) {
    console.log('Merging graph data')
    const oldData = state.graph.data
    var mergedData = {}

    // if node already exists, overwrite, otherwise additional
    mergedData.nodes = _.unionBy(oldData.nodes, newData.nodes, node => node.id)
    // same for links
    mergedData.links = _.unionBy(oldData.links, newData.links, link => link.id)
    console.debug(`Added ${mergedData.nodes.length - oldData.nodes.length} nodes and ${mergedData.links.length - oldData.links.length} links`)
    state.graph.data = mergedData
  },
  replaceGraphData (state, newData) {
    console.log('Replacing graph data')
    state.graph.data = newData
  },
  updateLastSubquery (state, centralNodeId) {
    console.log('Updating the last subquery')
    state.graph.lastSubquery = centralNodeId
  }
}

// actions are functions that causes side effects and can involve
// asynchronous operations.
const actions = {
  addSubgraph ({ commit }, centralNodeId) {
    const getUrl = urljoin(endpoints.subgraph, centralNodeId)
    console.log('Adding subgraph from ' + getUrl)
    axios.get(getUrl)
      .then((response) => {
        commit('mergeGraphData', response.data)
      })
      .catch((error) => {
        console.error(error)
      })
    commit('updateLastSubquery', centralNodeId)
  },
  replaceSubgraph ({ commit }, centralNodeId) {
    const getUrl = urljoin(endpoints.subgraph, centralNodeId)
    console.log('Replacing subgraph from ' + getUrl)
    axios.get(getUrl)
      .then((response) => {
        commit('replaceGraphData', response.data)
      })
      .catch((error) => {
        console.error(error)
      })
    commit('updateLastSubquery', centralNodeId)
  }
}

// getters are functions
const getters = {
  doWeHaveFlaggedNodes: state => state.graph.flaggedNodes.length > 0
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
