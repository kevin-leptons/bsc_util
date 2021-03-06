# Documents

* [Installation](#installation)
* [Examples](#examples)
* [API References](https://kevin-leptons.github.io/bsc_util)
* [Development](#development)
* [References](#references)

# Installation

```bash
npm install bsc_util
```

# Examples

```js
const {getPoolAddress, toEthAddress, ExchangeName} = require('bsc_util')

let cakeAddress = toEthAddress('0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82')
let wbnbAddress = toEthAddress('0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
let poolAddress = getPoolAddress(
    ExchangeName.PANCAKE2,
    cakeAddress,
    wbnbAddress
)
```

# Development

```bash
npm test                # Run unit tests
npm run standardize     # Check coding standard
npm run doc             # Build documents and put to directory `./docs`.
npm run doc-server      # Start local server to test documents.
npm run doc-clean       # Empty documents directory `./docs`.
```

# References

* [PancakeSwap V2 Factory](https://github.com/pancakeswap/pancake-swap-core/blob/3b214306770e86bc3a64e67c2b5bdb566b4e94a7/contracts/PancakeFactory.sol)
* [JulSwap Factory](https://github.com/JustLiquidity/swapliquidity/blob/5747373edfcb0d3b04f6531a6cb5b16811229649/contracts/bscswap/BSCswapFactory.sol)
* [ApeSwap Factory](https://github.com/ApeSwapFinance/apeswap-swap-core/blob/9a51c4906606ad8974cabaa3aaf474af4618d0e5/contracts/ApeFactory.sol)
* [BakerySwap Factory](https://github.com/BakeryProject/bakery-swap-core/blob/904f7dc210ed45f30b602068efc94b277d01fa0e/contracts/BakerySwapFactory.sol)
* [BurgerSwap Factory](https://github.com/burgerswap-org/burgerswap-core/blob/2ca32d36cff76d28be40a1b089ab651e65f7f2b0/contracts/DemaxFactory.sol)
* [BiSwap Factory](https://github.com/biswap-org/core/blob/main/contracts/BiswapFactory.sol)
* [MdexSwap Factory](https://github.com/mdexSwap/bscswap)
* [CafeSwap Factory](https://github.com/CafeSwap/cafe-swap-core/blob/master/contracts/CafeFactory.sol)
* [JetSwap Factory](https://docs.jetswap.finance/contracts)
* [BabySwap Factory](https://docs.babyswap.finance/developers/smart-contracts)
