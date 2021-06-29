'use strict'

const {keccak256} = require('ethers').utils
const {AddressZero} = require('ethers').constants

// Descriptions
//  * Build token pair address from two token addresses.
//  * ETH address can be prefix with or without `0x`.
//
// Input
//  * factory {String} One of `pancake`, `pancake2`, `burger`, `jul`, `ape`,
//    `bakery`.
//  * addressA {String} ETH token address.
//  * addressB {String} Other ETH token address.
//
// Output {String} Non checksum ETH token pair address.
//
// Errors
//  * Error `Invalid factory`
//  * Error `Invalid ETH address`
//  * Error `Not accepted zero address`
//  * Error `Not identical address`
function findPair(factory, addressA, addressB) {
    let lowerAddressA = addressA.toString()
    let lowerAddressB = addressB.toString()

    _validatePairAddresses(lowerAddressA, lowerAddressB)

    switch (factory) {
        case 'pancake':
            return _buildPancakeSwapV1(lowerAddressA, lowerAddressB)
        case 'pancake2':
            return _buildPancakeSwapV2(lowerAddressA, lowerAddressB)
        case 'burger':
            return _buildBurgerSwap(lowerAddressA, lowerAddressB)
        case 'jul':
            return _buildJulSwap(lowerAddressA, lowerAddressB)
        case 'ape':
            return _buildApeSwap(lowerAddressA, lowerAddressB)
        case 'bakery':
            return _buildBakerySwap(lowerAddressA, lowerAddressB)
        default:
            throw Error('Invalid factory')
    }
}

// Descriptions
//  * Ensure that addresses is valid to create a token pair.
//
// Input
//  * addressA {String} ETH address.
//  * addressB {String} ETH address.
//
// Errors
//  * Error `Invalid ETH address`
//  * Error `Not accepted zero address`
//  * Error `Not identical address`
function _validatePairAddresses(addressA, addressB) {
    if (!_isEthAddress(addressA) || !_isEthAddress(addressB)) {
        throw Error('Invalid token address')
    }

    if (addressA === AddressZero || addressB === AddressZero) {
        throw Error('Not accepted zero address')
    }

    if (addressA === addressB) {
        throw Error('Not identical address')
    }
}

// Descriptions
//  * Validate an address is ETH address with prefix `0x`.
//
// Input
//  * address {String}
//
// Output
//  * {true} Address is a ETH address.
//  * {false} Address is not a ETH address.
function _isEthAddress(address) {
    return /^0x[0-9a-fA-f]{40}$/.test(address)
}

// Descriptions
//  * Build PancakeSwap V1 token pair address from two token addresses.
//  * Input addresses must be non checksum.
//
// Input
//  * addressA {String} ETH token address.
//  * addressB {String} Other ETH token address.
//
// Output {String} Non checksum token pair address.
function _buildPancakeSwapV1(addressA, addressB) {
    let tokens = [addressA, addressB].sort()
    let salt = keccak256(
        tokens[0] + tokens[1].substring(2)
    ).substring(2)
    let factoryAddress = 'bcfccbde45ce874adcb698cc183debcf17952812'
    let factoryInitCode =
        'd0d4c4cd0848c93cb4fd1f498d7013ee6bfb25783ea21593d5834f5d250ece66'
    let data = ['0xff', factoryAddress, salt, factoryInitCode].join('')

    return '0x'+ keccak256(data).substring(26)
}

// Descriptions
//  * Build PancakeSwap V2 token pair address from two token addresses.
//  * Input addresses must be non checksum.
//  * Factory source: https://github.com/pancakeswap/pancake-swap-core/blob/3b214306770e86bc3a64e67c2b5bdb566b4e94a7/contracts/PancakeFactory.sol
//
// Input
//  * addressA {String} ETH token address.
//  * addressB {String} Other ETH token address.
//
// Output {String} Non checksum token pair address.
function _buildPancakeSwapV2(addressA, addressB) {
    let tokens = [addressA, addressB].sort()
    let factoryAddress = 'ca143ce32fe78f1f7019d7d551a6402fc5350c73'
    let factoryInitCode =
        '00fb7f630766e6a796048ea87d01acd3068e8ff67d078148a3fa3f4a84f69bd5'
    let salt = keccak256(
        tokens[0] + tokens[1].substring(2)
    ).substring(2)
    let data = ['0xff', factoryAddress, salt, factoryInitCode].join('')

    return '0x'+ keccak256(data).substring(26)
}

// Descriptions
//  * Build Demax token pair address from two token addresses.
//  * Demax factory create token pairs which is use by BurgerSwap.
//  * Input addresses must be non checksum.
//  * Factory source: https://github.com/burgerswap-org/burgerswap-core/blob/2ca32d36cff76d28be40a1b089ab651e65f7f2b0/contracts/DemaxFactory.sol
//
// Input
//  * addressA {String} ETH token address.
//  * addressB {String} Other ETH token address.
//
// Output {String} Non checksum token pair address.
function _buildBurgerSwap(addressA, addressB) {
    let tokens = [addressA, addressB].sort()
    let factoryAddress = '8a1e9d3aebbbd5ba2a64d3355a48dd5e9b511256'
    let factoryInitCode =
        '9e2f28ebeccb25f4ead99c3f563bb6a201e2014a501d90dd0a9382bb1f5f4d0e'
    let salt = keccak256(
        tokens[0] + tokens[1].substring(2)
    ).substring(2)
    let data = ['0xff', factoryAddress, salt, factoryInitCode].join('')

    return '0x'+ keccak256(data).substring(26)

}

// Descriptions
//  * Build JustLiquidity token pair address from two token addresses.
//  * JustLiquidity token pair is use by JulSwap.
//  * Input addresses must be non checksum.
//  * Factory source: https://github.com/JustLiquidity/swapliquidity/blob/5747373edfcb0d3b04f6531a6cb5b16811229649/contracts/bscswap/BSCswapFactory.sol
//
// Input
//  * addressA {String} ETH token address.
//  * addressB {String} Other ETH token address.
//
// Output {String} Non checksum token pair address.
function _buildJulSwap(addressA, addressB) {
    let tokens = [addressA, addressB].sort()
    let factoryAddress = '553990f2cba90272390f62c5bdb1681ffc899675'
    let factoryInitCode =
        'b1e98e21a5335633815a8cfb3b580071c2e4561c50afd57a8746def9ed890b18'
    let salt = keccak256(
        tokens[0] + tokens[1].substring(2)
    ).substring(2)
    let data = ['0xff', factoryAddress, salt, factoryInitCode].join('')

    return '0x'+ keccak256(data).substring(26)
}

// Descriptions
//  * Build Ape token pair address from two token addresses.
//  * Ape token pair is use by ApleSwapFinance.
//  * Input addresses must be non checksum.
//  * Factory source: https://github.com/ApeSwapFinance/apeswap-swap-core/blob/9a51c4906606ad8974cabaa3aaf474af4618d0e5/contracts/ApeFactory.sol
//
// Input
//  * addressA {String} ETH token address.
//  * addressB {String} Other ETH token address.
//
// Output {String} Non checksum token pair address.
function _buildApeSwap(addressA, addressB) {
    let tokens = [addressA, addressB].sort()
    let factoryAddress = '152349604d49c2af10adee94b918b051104a143e'
    let factoryInitCode =
        'f4ccce374816856d11f00e4069e7cada164065686fbef53c6167a63ec2fd8c5b'
    let salt = keccak256(
        tokens[0] + tokens[1].substring(2)
    ).substring(2)
    let data = ['0xff', factoryAddress, salt, factoryInitCode].join('')

    return '0x'+ keccak256(data).substring(26)
}

// Descriptions
//  * Build BakerySwap token pair address from two token addresses.
//  * Input addresses must be non checksum.
//  * Factory source: https://github.com/BakeryProject/bakery-swap-core/blob/904f7dc210ed45f30b602068efc94b277d01fa0e/contracts/BakerySwapFactory.sol
//
// Input
//  * addressA {String} ETH token address.
//  * addressB {String} Other ETH token address.
//
// Output {String} Non checksum token pair address.
function _buildBakerySwap(addressA, addressB) {
    let tokens = [addressA, addressB].sort()
    let factoryAddress = '01bf7c66c6bd861915cdaae475042d3c4bae16a7'
    let factoryInitCode =
        'e2e87433120e32c4738a7d8f3271f3d872cbe16241d67537139158d90bac61d3'
    let salt = keccak256(
        tokens[0] + tokens[1].substring(2)
    ).substring(2)
    let data = ['0xff', factoryAddress, salt, factoryInitCode].join('')

    return '0x' + keccak256(data).substring(26)
}

module.exports = {
    findPair,
    _buildPancakeSwapV1,
    _buildPancakeSwapV2,
    _buildBurgerSwap,
    _buildJulSwap,
    _buildApeSwap,
    _buildBakerySwap
}
