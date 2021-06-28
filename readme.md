# BSC Utilities

* Utilities for tokens and token pairs on Binance Smart Chain network.

# Install

```bash
npm install bsc_util
```

# APIs

```js
const bscUtil = require('bsc_util')

// factory can be
//  * `pancake` PancakeSwap V1
//  * `pancake2` PancakeSwap V2
//  * `burger` Demax factory which is use by BurgerSwap
//  * `jul` JulSwap
//  * `ape` ApeSwap
let factory = 'pancake'
let cakeAddress = '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82'
let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
let pairAddress = bscUtil.findPair(factory, cakeAddress, wbnbAddress)
```

# Development

```bash
npm test
```
