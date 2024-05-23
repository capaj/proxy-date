[![npm version](https://badge.fury.io/js/proxy-date.svg)](https://badge.fury.io/js/proxy-date)
[![deps](https://david-dm.org/capaj/proxy-date.svg)](https://david-dm.org/capaj/proxy-date)

# proxy-date

a minimal utility for painless mocking Date in node.js and Proxy enabled browsers

![gif](https://media.giphy.com/media/l4hLT6kXPi9js7xFC/giphy.gif)

## Why yet another Date mocking library?

Yes there is plenty of them already out there(timekeeper, mockdate atc.), but this one is the only one using proxies. What's so special about proxies? It only intercepts the constructor and `.now()`. There is no monkeypatching globals like with all the other libraries. Which means any other code relying on `Date.constructor` for example won't get affected by this.
The only downside is this only works for node.js 6 and up.

## Install

```
pnpm i proxy-date -D
```

## Usage

```js
import { mockDate, unmockDate } from 'proxy-date'

mockDate('2020-01-19T00:20:20.654Z')
new Date().toISOString() //2019-01-19T00:20:20.654Z

unmockDate()
new Date().toISOString() // now
```

I like to use this with jest's snapshot tests to ensure I don't have to manually write matchers for every date that happens to occur in a snapshot.
