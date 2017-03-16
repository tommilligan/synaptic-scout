const urljoin = require('url-join')

const base = process.env.SYNAPTIC_SCOUT_BACKEND_URL || 'http://localhost:5000/'
const subgraph = urljoin(base, 'explore', 'subgraph')

export default {
  base: base,
  subgraph: subgraph
}
