let globalObj = Function('return this')()
globalObj._unmockedDate = globalObj.Date

export function mockDate(date: string | number | Date) {
  globalObj.Date = new Proxy(globalObj._unmockedDate, {
    construct: function (Target, args) {
      // props to https://stackoverflow.com/a/43160428/671457
      if (args.length === 0) {
        return new Target(date)
      }
      return new Target(...args)
    },
    get: function (Target, prop, receiver) {
      if (prop === 'now') {
        return () => new Target(date) * 1
      }
      // @ts-expect-error
      return Reflect.get(...arguments)
    },
  })
}

export function unmockDate() {
  globalObj.Date = globalObj._unmockedDate
  delete globalObj._unmockedDate
}
