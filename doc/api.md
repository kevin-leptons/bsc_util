# API References

* [getPoolAddress()](#getpooladdress)
* [getPoolAddressHeximal()](#getpoolAddressHeximal)
* [getExchangeAmount()](#getexchangeAmount)
* [Types](#types)

## getPoolAddress()

```js
// Descriptions
//  * Build pool address from two token addresses.
//
// Input
//  * exchange {ExchangeName}
//  * addressA {EthAddress} First token address.
//  * addressB {EthAddress} Second token address.
//
// Output {EthAddress} Address of the pool.
//
// Errors
//  * Error `Invalid exchange`
//  * Error `Invalid ETH address`
//  * Error `Not accepted zero address`
//  * Error `Not identical address`
function getPoolAddress(exchange, addressA, addressB) {}
```

## getPoolAddressHeximal()

```js
// Descriptions
//  * Build pool address from two token addresses with heximal format.
//
// Input
//  * exchange {ExchangeName}
//  * addressA {EthAddressHeximal} First token address.
//  * addressB {EthAddressHeximal} Second token address.
//
// Output {EthAddressHeximal} Address of the pool.
//
// Errors
//  * Error `Invalid exchange`
//  * Error `Invalid ETH address`
//  * Error `Not accepted zero address`
//  * Error `Not identical address`
function getPoolAddressHeximal(factory, addressA, addressB) {}
```

## getExchangeAmount()

```js
// Descriptions
//  * Calculate amount of received token on swap.
//  * The fomular: a1 = r1.a0/(r0 + a0), where `a1` is amount of output token.
//
// Input
//  * exchange {ExchangeName}
//  * a0 {NumberLike} Amount of input token.
//  * r0 {NumberLike} Reserve of input token.
//  * r1 {NumberLike} Reserve of output token.
//
// Output {BigNumber} Amount of output token.
//
// Errors
//  * Error `Invalid reserves`
//  * Error `Invalid input amount`
function getExchangeAmount(exchange, a0, r0, r1) {}
```

## Types

```js
// Type EthAddress {Buffer}
//
// An ETH address, 20 bytes.

// Type EthAddressHeximal {String}
//
// An ETH address as heximal, 42 symbol, prefixed with "0x".

// Type ExchangeName {String}
//
// One of following values:
//  * "pancake"
//  * "pancake2"
//  * "bakery"
//  * "jul"
//  * "ape"
//  * "bi"
//  * "mdex"
//  * "cafe"
//  * "jet"
```
