'use strict'

/*eslint-disable no-unused-vars*/
const {
    EthAddress,
    FactoryInitCode,
    EthAddressHeximal,
    FactoryInitCodeHeximal
} = require('./type')
/*eslint-enable no-unused-vars*/

/**
 * @private
 * @param {EthAddressHeximal} value
 * @returns {EthAddress}
 */
function toEthAddress(value) {
    if (typeof value !== 'string') {
        throw new Error('heximal ETH address is not a string')
    }

    if (/^0x[a-fA-F0-9]{40}$/.test(value) === false) {
        throw new Error('heximal ETH address does not match pattern')
    }

    let noPrefixedHeximal = value.slice(2)

    return Buffer.from(noPrefixedHeximal, 'hex')
}

/**
 * @private
 * @param {FactoryInitCodeHeximal} value
 * @returns {FactoryInitCode}
 */
function toFactoryInitCode(value) {
    if (typeof value !== 'string') {
        throw new Error('heximal factory init code is not a string')
    }

    if (/^0x[a-fA-F0-9]{64}$/.test(value) === false) {
        throw new Error('heximal factory init code does not match pattern')
    }

    let noPrefixedHeximal = value.slice(2)

    return Buffer.from(noPrefixedHeximal, 'hex')
}

module.exports = {
    toEthAddress,
    toFactoryInitCode
}
