import { mock, unmock } from './proxy-date'

describe('proxyDate', function() {
  const date = '2019-01-19T00:20:20.654Z'
  mock(date)
  const mockedDate = Date.now()

  it('should work for constructor', (done) => {
    expect(new Date().toISOString()).toEqual(date)

    setTimeout(() => {
      expect(new Date().toISOString()).toEqual(date)
      done()
    }, 100)
  })

  it('should work for .now', (done) => {
    expect(Date.now()).toMatchInlineSnapshot(`1547857220654`)

    setTimeout(() => {
      expect(Date.now()).toMatchInlineSnapshot(`1547857220654`)
      done()
    }, 100)
  })

  it('should unmock', async () => {
    unmock()
    expect(Date.now() > mockedDate)
    expect(new Date() * 1 > mockedDate)
    expect(global._unmockedDate).toBe(undefined)
  })
})
