/*eslint-disable max-len*/

'use strict'

const assert = require('assert')
const {_getPoolAddressOpenocean} = require('../')
const {heximalToBuffer} = require('./_lib')

describe('_getPoolAddressOpenocean', () => {
    it('METAPAY/BUSD', () => {
        let metapayAddress = heximalToBuffer('0x4c460c84b34a89fb76778a0995b2128e6038c995')
        let busdAddress = heximalToBuffer('0xe9e7cea3dedca5984780bafc599bd69add087d56')
        let expectAddress = heximalToBuffer('0x564e68785fa27e836160ffce201051dce17c5e18')
        let actualAddress = _getPoolAddressOpenocean(metapayAddress, busdAddress)

        assert.strictEqual(
            actualAddress.equals(expectAddress),
            true
        )
    })

    it('STRM/BUSD', () => {
        let streamAddress = heximalToBuffer('0xc598275452fa319d75ee5f176fd3b8384925b425')
        let busdAddress = heximalToBuffer('0xe9e7cea3dedca5984780bafc599bd69add087d56')
        let expectAddress = heximalToBuffer('0xa520c339234cc509f9b42b19c48689519d0cb46d')
        let actualAddress = _getPoolAddressOpenocean(streamAddress, busdAddress)

        assert.strictEqual(
            actualAddress.equals(expectAddress),
            true
        )
    })

    it('Different addresses order, return the same result', () => {
        let metapayAddress = heximalToBuffer('0x4c460c84b34a89fb76778a0995b2128e6038c995')
        let busdAddress = heximalToBuffer('0xe9e7cea3dedca5984780bafc599bd69add087d56')
        let expectAddress = heximalToBuffer('0x564e68785fa27e836160ffce201051dce17c5e18')
        let actualAddress1 = _getPoolAddressOpenocean(metapayAddress, busdAddress)
        let actualAddress2 = _getPoolAddressOpenocean(busdAddress, metapayAddress)

        assert.strictEqual(
            actualAddress1.equals(actualAddress2),
            true
        )
        assert.strictEqual(
            actualAddress1.equals(expectAddress),
            true
        )
    })
})
