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
  var proxy = new Proxy(function() {
    var args = Array.prototype.slice.call(arguments)
      .map(function(item) {
        if (typeof item === 'object') {
          var classes = ''
          for (var key in item) {
            if (item[key]) {
              classes += ' ${name}_' + key
            }
          }
          return classes.trim()
        }
        return '${name}_' + item
      })
      .join(' ')
    return args
  }, {
    get: function (target, name) {
      if (name === 'default') return proxy
      return '${name}_' + name.toString()
    }
  })
  return proxy
})()
`
}
