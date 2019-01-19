# proxy-date

a minimal utility for painless mocking Date in node.js and Proxy enabled browsers

![gif](https://media.giphy.com/media/l4hLT6kXPi9js7xFC/giphy.gif)

## Why yet another Date mocking library?

Yes there is plenty of them already out there(timekeeper, mockdate atc.), but this one is the only one using proxies. What's so special about proxies? It only intercepts the constructor and `.now()`. There is no monkeypatching globals like with all the other libraries. Which means any other code working with `Date` global won't get affected by this.
The only downside is this only wors for node.js 6 and up.

## Install

```
npm i proxy-date -D
yarn add proxy-date -D
```

## Usage

```js
import { mock, unmock } from 'proxy-date'

mock('2020-01-19T00:20:20.654Z')
new Date().toISOString() //2019-01-19T00:20:20.654Z

unmock()
new Date().toISOString() // now
```