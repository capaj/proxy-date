'use strict'

Object.defineProperty(exports, '__esModule', {
  value: true
})
exports.mock = mock
exports.unmock = unmock
let globalObj = Function('return this')()
globalObj._unmockedDate = globalObj.Date

function mock(date) {
  globalObj.Date = new Proxy(globalObj._unmockedDate, {
    construct: function construct(Target, args) {
      // props to https://stackoverflow.com/a/43160428/671457
      if (args.length === 0) {
        return new Target(date)
      }

      return new Target(...args)
    },
    get: function get(Target, prop, receiver) {
      if (prop === 'now') {
        return () => new Target(date) * 1
      }

      return Reflect.get(...arguments)
    }
  })
}

function unmock() {
  globalObj.Date = globalObj._unmockedDate
}
