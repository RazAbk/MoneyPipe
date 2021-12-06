let configuration;

if (process.env.NODE_ENV === 'production') {
  configuration = require('./prod')
} else {
  configuration = require('./dev')
}

module.exports = configuration