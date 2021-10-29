'use strict'

// Descriptions
//  * Convert heximal string to buffer.
//
// Input
//  * heximal {String} Heximal string with prefix `0x`.
//
// Output {Buffer}
function heximalToBuffer(heximal) {
    let prefix = heximal.slice(0, 2)

    if (prefix !== '0x') {
        throw new Error('Invalid heximal string with prefix "0x"')
    }

    let heximalNoPrefix = heximal.slice(2)

    return Buffer.from(heximalNoPrefix, 'hex')
}

module.exports = {
    heximalToBuffer
}
