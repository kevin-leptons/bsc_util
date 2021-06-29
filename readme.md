# BSC Utilities

* Utilities for tokens and token pairs on Binance Smart Chain network.

# Install

```bash
npm install bsc_util
```

# Use

```js
const {findPair} = require('bsc_util')
```

# APIs

```js
// Descriptions
//  * Build token pair address from two token addresses.
//
// Input
//  * factory {String} One of `pancake`, `pancake2`, `burger`, `jul`, `ape`,
//    `bakery`.
//  * addressA {String} ETH token address with or without `0x`.
//  * addressB {String} An other ETH token address.
//
// Output {String} Checksum ETH token pair address with prefix `0x`.
//
// Errors
//  * Error `Invalid factory`
//  * Error `Invalid ETH address`
//  * Error `Not accepted zero address`
//  * Error `Not identical address`
function findPair(factory, addressA, addressB) {}
```

# Development

```bash
npm test            # Perform unit tests
npm run standard    # Check coding standard
```

# References

* [PancakeSwap V2 Factory](https://github.com/pancakeswap/pancake-swap-core/blob/3b214306770e86bc3a64e67c2b5bdb566b4e94a7/contracts/PancakeFactory.sol)
* [BurgerSwap Factory](https://github.com/burgerswap-org/burgerswap-core/blob/2ca32d36cff76d28be40a1b089ab651e65f7f2b0/contracts/DemaxFactory.sol)
* [JulSwap Factory](https://github.com/JustLiquidity/swapliquidity/blob/5747373edfcb0d3b04f6531a6cb5b16811229649/contracts/bscswap/BSCswapFactory.sol)
* [ApeSwap Factory](https://github.com/ApeSwapFinance/apeswap-swap-core/blob/9a51c4906606ad8974cabaa3aaf474af4618d0e5/contracts/ApeFactory.sol)
* [BakerySwap Factory](https://github.com/BakeryProject/bakery-swap-core/blob/904f7dc210ed45f30b602068efc94b277d01fa0e/contracts/BakerySwapFactory.sol)
