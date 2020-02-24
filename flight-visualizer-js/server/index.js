if (process.env.NODE_ENV === 'DEVELOPMENT') {
  require('@babel/register')
  module.exports = require('./lib')
} else {
  module.exports = require('./dist')
}
