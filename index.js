var path = require('path')

module.exports = function(source, map) {
  this.callback(null, source, map)
}

module.exports.pitch = function(remainingRequest) {
  this.cacheable && this.cacheable()
  var name = path.parse(remainingRequest).name
  return `
'use strict'
exports = module.exports = (function () {
  var p = new Proxy(function() {
    var args = Array.prototype.slice.call(arguments)
    return args.map(function(item) { return '${name}_' + item }).join(' ')
  }, {
    get: function (target, name) {
      if (name === 'default') return target
      return '${name}_' + name
    }
  })
  return p
})()
`
}
