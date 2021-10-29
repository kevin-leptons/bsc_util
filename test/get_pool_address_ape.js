/*eslint-disable max-len*/

'use strict'

const assert = require('assert')
const {_getPoolAddressApe} = require('../')
const {heximalToBuffer} = require('./_lib')

describe('_getPoolAddressApe', () => {
    it('LNX/WBNB', () => {
        let lnxAddress = heximalToBuffer('0xc465503b2f65cc67a070f9afe3f095f2d1e49331')
        let wbnbAddress = heximalToBuffer('0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let expectAddress = heximalToBuffer('0x878f20766bae2748efa77824b8c4f51513aee3eb')
        let actualAddress = _getPoolAddressApe(lnxAddress, wbnbAddress)

        assert.strictEqual(
            actualAddress.equals(expectAddress),
            true
        )
    })

    it('FAKEBTC/FAKEBUSD', () => {
        let fakebtcAddress = heximalToBuffer('0xd4f9cfeeb91ec4d75e1d8b6ef79a0ac99aa6bd65')
        let fakebusdAddress = heximalToBuffer('0x13221778dd4c06315a7922cae6ee939800d9c9d6')
        let expectAddress = heximalToBuffer('0x0a7df81c7fe79d16916710e338dceb5d9c18588a')
        let actualAddress = _getPoolAddressApe(fakebtcAddress, fakebusdAddress)

        assert.strictEqual(
            actualAddress.equals(expectAddress),
            true
        )
    })

    it('Different addresses order, return the same result', () => {
        let lnxAddress = heximalToBuffer('0xc465503b2f65cc67a070f9afe3f095f2d1e49331')
        let wbnbAddress = heximalToBuffer('0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let expectAddress = heximalToBuffer('0x878f20766bae2748efa77824b8c4f51513aee3eb')
        let actualAddress1 = _getPoolAddressApe(lnxAddress, wbnbAddress)
        let actualAddress2 = _getPoolAddressApe(wbnbAddress, lnxAddress)

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
