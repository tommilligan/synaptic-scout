module.exports = {
  NODE_ENV: '"production"',
  SYNAPTIC_SCOUT_BACKEND_URL: (process.env.SYNAPTIC_SCOUT_BACKEND_URL) ? '"'+process.env.SYNAPTIC_SCOUT_BACKEND_URL+'"' : undefined
}
