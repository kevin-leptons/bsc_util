'use strict'

const BigNumber = require('bignumber.js')

// Type BigNumber {BigNumber from bignumber.js}

// Type NumberLike {Number | String | BigNumber} Represent for a number. If it
// is string then it contains decimal digits.

// Type ExchangeName {String} One of following values: `pancake`, `pancake2`,
// `bakery`, `jul`, `ape`.

const {
    keccak256,
    isAddress,
    getAddress
} = require('ethers').utils

const ADDRESS_ZERO = Buffer.alloc(20, 0)
const HEX_FF = Buffer.from('ff', 'hex')
const PANCAKESWAP_FACTORY_ADDRESS_V1 = Buffer.from(
    'bcfccbde45ce874adcb698cc183debcf17952812',
    'hex'
)
const PANCAKESWAP_FACTORY_CODE_V1 = Buffer.from(
    'd0d4c4cd0848c93cb4fd1f498d7013ee6bfb25783ea21593d5834f5d250ece66',
    'hex'
)
const PANCAKESWAP_FACTORY_ADDRESS_V2 = Buffer.from(
    'ca143ce32fe78f1f7019d7d551a6402fc5350c73',
    'hex'
)
const PANCAKESWAP_FACTORY_CODE_V2 = Buffer.from(
    '00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5',
    'hex'
)
const BURGERSWAP_FACTORY_ADDRESS = Buffer.from(
    '8a1e9d3aebbbd5ba2a64d3355a48dd5e9b511256',
    'hex'
)
const BURGERSWAP_FACTORY_CODE = Buffer.from(
    '9e2f28ebeccb25f4ead99c3f563bb6a201e2014a501d90dd0a9382bb1f5f4d0e',
    'hex'
)
const JULSWAP_FACTORY_ADDRESS = Buffer.from(
    '553990f2cba90272390f62c5bdb1681ffc899675',
    'hex'
)
const JULSWAP_FACTORY_CODE = Buffer.from(
    'b1e98e21a5335633815a8cfb3b580071c2e4561c50afd57a8746def9ed890b18',
    'hex'
)
const APESWAP_FACTORY_ADDRESS = Buffer.from(
    '0841bd0b734e4f5853f0dd8d7ea041c241fb0da6',
    'hex'
)
const APESWAP_FACTORY_CODE = Buffer.from(
    'f4ccce374816856d11f00e4069e7cada164065686fbef53c6167a63ec2fd8c5b',
    'hex'
)
const BAKERYSWAP_FACTORY_ADDRESS = Buffer.from(
    '01bf7c66c6bd861915cdaae475042d3c4bae16a7',
    'hex'
)
const BAKERYSWAP_FACTORY_CODE = Buffer.from(
    'e2e87433120e32c4738a7d8f3271f3d872cbe16241d67537139158d90bac61d3',
    'hex'
)

// Descriptions
//  * Build token pair address from two token addresses.
//
// Input
//  * factory {String} One of `pancake`, `pancake2`, `burger`, `jul`, `ape`,
//    `bakery`.
//  * addressA {String} ETH token address with or without prefix `0x`,
//    checksum or non-checksum.
//  * addressB {String} An other token address.
//
// Output {String} Checksum ETH token pair address with prefix `0x`.
//
// Errors
//  * Error `Invalid factory`
//  * Error `Invalid ETH address`
//  * Error `Not accepted zero address`
//  * Error `Not identical address`
function findPair(factory, addressA, addressB) {
    let [bufferA, bufferB] = _toAddressPairBuffer(addressA, addressB)
    let address = _buildTokenPairAddress(factory, bufferA, bufferB)

    return getAddress(
        address.toString('hex')
    )
}

// Descriptions
//  * Validate addresses.
//  * Convert string addresses to buffers.
//
// Input
//  * addressA {String} ETH address with or without prefix `0x`, checksum or
//    non-checksum.
//  * addressB {String} ETH address with or without prefix `0x`, checksum or
//    non-checksum.
//
// Output {Array[]}
//  * [0] {Buffer} addressA as buffer.
//  * [1] {Buffer} addressB as buffer.
//
// Errors
//  * Error `Invalid ETH address`
//  * Error `Not accepted zero address`
//  * Error `Not identical address`
function _toAddressPairBuffer(addressA, addressB) {
    if (!isAddress(addressA) || !isAddress(addressB)) {
        throw Error('Invalid ETH address')
    }

    let bufferA = _bufferFromAddress(addressA)
    let bufferB = _bufferFromAddress(addressB)

    if (bufferA.equals(ADDRESS_ZERO) || bufferB.equals(ADDRESS_ZERO)) {
        throw Error('Not accepted zero address')
    }

    if (bufferA.equals(bufferB)) {
        throw Error('Not identical address')
    }

    return [bufferA, bufferB]
}

// Input
//  * address {String} ETH address with or without prefix `0x`, checksum or
//    non-checksum.
//
// Output {Buffer} Address as buffer.
function _bufferFromAddress(address) {
    let prefix = address.substring(0, 2)

    return prefix === '0x'
        ? Buffer.from(address.substring(2), 'hex')
        : Buffer.from(address, 'hex')
}

// Descriptions
//  * Build token pair address from two token addresses.
//
// Input
//  * factory {String} One of `pancake`, `pancake2`, `burger`, `jul`, `ape`,
//    `bakery`.
//  * addressA {Buffer} ETH token address.
//  * addressB {Buffer} An other ETH token address.
//
// Output {Buffer} ETH token pair address.
//
// Errors
//  * Error `Invalid factory`
function _buildTokenPairAddress(factory, addressA, addressB) {
    switch (factory) {
        case 'pancake':
            return _buildPancakeSwapV1(addressA, addressB)
        case 'pancake2':
            return _buildPancakeSwapV2(addressA, addressB)
        case 'burger':
            return _buildBurgerSwap(addressA, addressB)
        case 'jul':
            return _buildJulSwap(addressA, addressB)
        case 'ape':
            return _buildApeSwap(addressA, addressB)
        case 'bakery':
            return _buildBakerySwap(addressA, addressB)
        default:
            throw Error('Invalid factory')
    }
}

// Descriptions
//  * Sort two addresses by increasing order.
//
// Input
//  * addressA {Buffer} ETH address.
//  * addressB {Buffer} An other ETH address.
//
// Output {Array}
//  * Array[0] {Buffer} The address which is less than or equal Array[1].
//  * Array[1] {Buffer} The address which is greater or equal Array[0].
function _sortAddressPair(addressA, addressB) {
    return [addressA, addressB].sort((a, b) => a.compare(b))
}

// Descriptions
//  * Hash data by Keccak256 and return buffer as result.
//
// Input
//  * data {Buffer} Data as buffer.
//
// Output {Buffer} Hash result.
function _keccak256AsBuffer(data) {
    return Buffer.from(
        keccak256(data).substring(2),
        'hex'
    )
}

// Descriptions
//  * Build PancakeSwap V1 token pair address.
//
// Input
//  * addressA {Buffer} ETH token address.
//  * addressB {Buffer} An other address.
//
// Output {Buffer} Token pair address.
function _buildPancakeSwapV1(addressA, addressB) {
    let addresses = _sortAddressPair(addressA, addressB)
    let salt = _keccak256AsBuffer(
        Buffer.concat(addresses)
    )
    let data = Buffer.concat([
        HEX_FF,
        PANCAKESWAP_FACTORY_ADDRESS_V1,
        salt,
        PANCAKESWAP_FACTORY_CODE_V1
    ])
    let hash = _keccak256AsBuffer(data)

    return hash.slice(12)
}

// Descriptions
//  * Build PancakeSwap V2 token pair address.
//  * Factory source: See section `References` in `readme.md`.
//
// Input
//  * addressA {Buffer} ETH address.
//  * addressB {Buffer} An other address.
//
// Output {Buffer} Token pair address.
function _buildPancakeSwapV2(addressA, addressB) {
    let addresses = _sortAddressPair(addressA, addressB)
    let salt = _keccak256AsBuffer(
        Buffer.concat(addresses)
    )
    let data = Buffer.concat([
        HEX_FF,
        PANCAKESWAP_FACTORY_ADDRESS_V2,
        salt,
        PANCAKESWAP_FACTORY_CODE_V2
    ])
    let hash = _keccak256AsBuffer(data)

    return hash.slice(12)
}

// Descriptions
//  * Build Demax token pair address.
//  * Demax token pair is use by BurgerSwap.
//  * Factory source: See section `References` in `readme.md`.
//
// Input
//  * addressA {Buffer} ETH token address.
//  * addressB {Buffer} An other address.
//
// Output {Buffer} Token pair address.
function _buildBurgerSwap(addressA, addressB) {
    let addresses = _sortAddressPair(addressA, addressB)
    let salt = _keccak256AsBuffer(
        Buffer.concat(addresses)
    )
    let data = Buffer.concat([
        HEX_FF,
        BURGERSWAP_FACTORY_ADDRESS,
        salt,
        BURGERSWAP_FACTORY_CODE
    ])
    let hash = _keccak256AsBuffer(data)

    return hash.slice(12)
}

// Descriptions
//  * Build JustLiquidity token pair address.
//  * JustLiquidity token pair is use by JulSwap.
//  * Factory source: See section `References` in `readme.md`.
//
// Input
//  * addressA {Buffer} ETH token address.
//  * addressB {Buffer} An other address.
//
// Output {Buffer} Token pair address.
function _buildJulSwap(addressA, addressB) {
    let addresses = _sortAddressPair(addressA, addressB)
    let salt = _keccak256AsBuffer(
        Buffer.concat(addresses)
    )
    let data = Buffer.concat([
        HEX_FF,
        JULSWAP_FACTORY_ADDRESS,
        salt,
        JULSWAP_FACTORY_CODE
    ])
    let hash = _keccak256AsBuffer(data)

    return hash.slice(12)
}

// Descriptions
//  * Build Ape token pair address.
//  * Ape token pair is use by ApleSwapFinance.
//  * Factory source: See section `References` in `readme.md`.
//
// Input
//  * addressA {Buffer} ETH token address.
//  * addressB {Buffer} An other address.
//
// Output {Buffer} Token pair address.
function _buildApeSwap(addressA, addressB) {
    let addresses = _sortAddressPair(addressA, addressB)
    let salt = _keccak256AsBuffer(
        Buffer.concat(addresses)
    )
    let data = Buffer.concat([
        HEX_FF,
        APESWAP_FACTORY_ADDRESS,
        salt,
        APESWAP_FACTORY_CODE
    ])
    let hash = _keccak256AsBuffer(data)

    return hash.slice(12)
}

// Descriptions
//  * Build BakerySwap token pair address.
//  * Factory source: See section `References` in `readme.md`.
//
// Input
//  * addressA {Buffer} ETH token address.
//  * addressB {Buffer} An other address.
//
// Output {Buffer} Token pair address.
function _buildBakerySwap(addressA, addressB) {
    let addresses = _sortAddressPair(addressA, addressB)
    let salt = _keccak256AsBuffer(
        Buffer.concat(addresses)
    )
    let data = Buffer.concat([
        HEX_FF,
        BAKERYSWAP_FACTORY_ADDRESS,
        salt,
        BAKERYSWAP_FACTORY_CODE
    ])
    let hash = _keccak256AsBuffer(data)

    return hash.slice(12)
}

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
function getExchangeAmount(exchange, a0, r0, r1) {
    let outputAmount = _getExchangeAmount(
        exchange,
        new BigNumber(a0),
        new BigNumber(r0),
        new BigNumber(r1)
    )

    return outputAmount.toString()
}

// Descriptions
//  * It is similar like `getExchangeAmount` but with big number as input.
function _getExchangeAmount(exchange, a0, r0, r1) {
    if (a0.lt(0)) {
        throw Error('Invalid input amount')
    }

    if (r0.lte(0) || r1.lte(0)) {
        throw Error('Invalid reserves')
    }

    let fee = _exchangeFee(exchange, a0)
    let inputAmount = a0.minus(fee)
    let x = r1.times(inputAmount)
    let y = r0.plus(inputAmount)

    return x.div(y)
}

// Descriptions
//  * Calculate exchange fee.
//
// Input
//  * exchange {ExchangeName}
//  * inputAmount {BigNumber}
//
// Output {BigNumber}
function _exchangeFee(exchange, inputAmount) {
    let feeAsPercentage = _exchangeFeeAsPercentage(exchange)

    return inputAmount
        .times(feeAsPercentage)
        .div(100)
}

// Input
//  * exchange {ExchangeName}
//
// Output {BigNumber}
function _exchangeFeeAsPercentage(exchange) {
    switch (exchange) {
        case 'pancake': return 0.20
        case 'pancake2': return 0.25
        case 'bakery': return 0.3
        case 'ape': return 0.2
        case 'jul': return 0.3
        default: throw Error('Invalid exchange')
    }
}

module.exports = {
    findPair,
    getExchangeAmount,
    _buildPancakeSwapV1,
    _buildPancakeSwapV2,
    _buildBurgerSwap,
    _buildJulSwap,
    _buildApeSwap,
    _buildBakerySwap
}
