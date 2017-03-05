const urljoin = require('url-join')

const base = process.env.SYNAPTIC_SCOUT_BACKEND_URL || 'http://localhost:5000/'
const fullgraph = urljoin(base, 'fullgraph')
const subgraph = urljoin(base, 'subgraph')

export default {
  base: base,
  fullgraph: fullgraph,
  subgraph: subgraph
}
