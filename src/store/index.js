import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'
const urljoin = require('url-join')

import endpoints from '../constants/endpoints'

Vue.use(Vuex)

// root state object.
const state = {
  graph: {
    data: {
      nodes: [],
      links: []
    },
    flaggedNodes: []
  }
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  mergeGraphData (state, newData) {
    state.graph.data = newData
  }
}

// actions are functions that causes side effects and can involve
// asynchronous operations.
const actions = {
  addSubgraph ({ commit }, centralNodeId) {
    const getUrl = urljoin(endpoints.subgraph, centralNodeId)
    axios.get(getUrl)
      .then((response) => {
        commit('mergeGraphData', response.data)
      })
      .catch((error) => {
        console.error(error)
      })
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
