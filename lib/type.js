'use strict'

/**
 * ETH address, 20 bytes number as a buffer.
 *
 * @typedef {Buffer} EthAddress
 */

/**
 * Init code of a factory contract, 32 bytes as a buffer.
 *
 * @typedef {Buffer} FactoryInitCode
 */

/**
 * ETH address, 20 bytes number as a heximal string, prefix by `0x`.
 *
 * @typedef {string} EthAddressHeximal
 */

/**
 * ETH address, 20 bytes number as a heximal string, prefix with `0x`
 * or not, checksum or not.
 *
 * @typedef {string} EthAddressWeak
 */

/**
 * Init code of a factory contract, 32 bytes as a heximal string,
 * prefix by `0x`.
 *
 * @typedef {string} FactoryInitCodeHeximal
 */

/**
 * List of exchange names.
 *
 * @readonly
 * @enum {string}
 */
const ExchangeName = {
    PANCAKE: 'pancake',
    PANCAKE2: 'pancake2',
    BAKERY: 'bakery',
    JUL: 'jul',
    APE: 'ape',
    BI: 'bi',
    MDEX: 'mdex',
    CAFE: 'cafe',
    JET: 'jet',
    BABY: 'baby'
}

module.exports = {
    ExchangeName
}
