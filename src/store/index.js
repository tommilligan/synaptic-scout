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
    subqueried: []
  },
  flash: '',
  loading: false
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  updateFlashMessage (state, message) {
    console.debug(`Updating flash message with ${message}`)
    state.flash = message
  },
  updateLoading (state, status) {
    console.log(`Updating loading status to ${status}`)
    state.loading = status
  },
  mergeGraphData (state, newData) {
    console.log('Merging graph data')
    const oldData = state.graph.data
    console.debug(`New data; ${newData.nodes.length} nodes and ${newData.links.length} links`)
    var mergedData = {}

    // TODO for some reason these data types are different. Probably d3 binding?
    // if node already exists, overwrite, otherwise additional
    mergedData.nodes = _.unionBy(oldData.nodes, newData.nodes, node => node.id)
    // same for links
    mergedData.links = _.unionBy(oldData.links, newData.links, link => link.id)
    console.debug(`Added ${mergedData.nodes.length - oldData.nodes.length} nodes and ${mergedData.links.length - oldData.links.length} links`)
    state.graph.data = mergedData
  },
  clearGraphData (state) {
    console.log('Clearing graph data')
    state.graph.data = {
      nodes: [],
      links: []
    }
  },
  updateLastSubquery (state, centralNodeId) {
    console.log('Updating the last subquery')
    state.graph.lastSubquery = centralNodeId
  },
  resetSubqueried (state) {
    console.log('Resetting nodes known to be subqueried')
    state.graph.subqueried = []
  },
  addSubquery (state, centralNodeId) {
    console.log('Adding known subquery')
    state.graph.subqueried = _.concat(state.graph.subqueried, centralNodeId)
  }
}

// actions are functions that causes side effects and can involve
// asynchronous operations.
const actions = {
  getBackendUrlThen ({ commit, dispatch }, {url, thenCallback = (response) => {}}) {
    commit('updateLoading', true)
    console.debug(`GETting backend resource ${url}`)
    axios.get(url)
      .then((response) => {
        thenCallback(response)
        commit('updateLoading', false)
      })
      .catch((error) => {
        console.error(error)
        var message = 'Error with isoprene-pumpjack'
        var leaf = ''
        if (error.response) {
          // The request was made, but the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response.data && error.response.data.message) {
            leaf = error.response.data.message
          } else {
            switch (error.response.status) {
              case 503:
                leaf = 'Service unavailable'
                break
            }
          }
        } else {
          // Something happened in setting up the request that triggered an Error
          switch (error.message) {
            case 'Network Error':
              leaf = 'Connection failed'
              break
            default:
              leaf = error.message
          }
        }
        message = (leaf) ? `${message}: ${leaf}` : message
        dispatch('flashMessage', message)
        commit('updateLoading', false)
      })
  },
  flashMessage ({ commit }, message) {
    console.log(`Flashing message ${message}`)
    commit('updateFlashMessage', message)
  },
  flashClear ({ commit }) {
    console.log('Clearing flash message')
    commit('updateFlashMessage', '')
  },
  getSubgraphData ({ commit, dispatch }, {centralNodeId, thenCallback = (newData) => {}}) {
    console.log(`Getting subgraph for ${centralNodeId}`)
    const resourceUrl = urljoin(endpoints.subgraph, centralNodeId)
    dispatch('getBackendUrlThen', {
      url: resourceUrl,
      thenCallback: thenCallback
    })
    commit('addSubquery', centralNodeId)
    commit('updateLastSubquery', centralNodeId)
  },
  addSubgraph ({ commit, dispatch }, centralNodeId) {
    console.log(`Adding subgraph for ${centralNodeId}`)
    dispatch('getSubgraphData', {
      centralNodeId: centralNodeId,
      thenCallback: (response) => {
        commit('mergeGraphData', response.data)
      }
    })
  },
  clearGraph ({ commit }) {
    console.log(`Clearing graph data`)
    commit('resetSubqueried')
    commit('clearGraphData')
  },
  replaceSubgraph ({ commit, dispatch }, centralNodeId) {
    console.log(`Replacing graph with subgraph for ${centralNodeId}`)
    dispatch('clearGraph', centralNodeId)
    dispatch('addSubgraph', centralNodeId)
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
