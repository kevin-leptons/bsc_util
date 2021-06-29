'use strict'

// Descriptions
//  * Convert hex string to buffer.
//
// Input
//  * data {String} Hex string without prefix `0x`.
//
// Output {Buffer}
function hex(data) {
    return Buffer.from(data, 'hex')
}

module.exports = {
    hex
}
