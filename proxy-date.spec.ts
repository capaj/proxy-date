import { mockDate, unmockDate } from './proxy-date'
import { describe, it, expect } from 'vitest'
const D = global.Date

describe('proxyDate', function () {
  const date = '2019-01-19T00:20:20.654Z'
  mockDate(date)
  console.log(Date)
  const mockedDate = Date.now()

  it('should work for constructor', async () => {
    expect(new Date().toISOString()).toEqual(date)

    await new Promise((resolve) => {
      setTimeout(() => {
        expect(new Date().toISOString()).toEqual(date)
        resolve(null)
      }, 100)
    })
  })

  it('should work for .now', async () => {
    expect(Date.now()).toMatchInlineSnapshot(`1547857220654`)

    await new Promise((resolve) => {
      setTimeout(() => {
        expect(Date.now()).toMatchInlineSnapshot(`1547857220654`)
        resolve(null)
      }, 100)
    })
  })

  it('should unmockDate', async () => {
    unmockDate()
    expect(Date.now() > mockedDate)
    expect(new Date().getTime() * 1 > mockedDate)
    expect(global._unmockedDate).toBe(undefined)
  })
})
