'use strict'

const assert = require('assert')
const {_buildApeSwap} = require('../')
const {hex} = require('./util')

describe('_buildApeSwap', () => {
    it('LNX-WBNB', () => {
        let lnxAddress = hex('c465503b2f65cc67a070f9afe3f095f2d1e49331')
        let wbnbAddress = hex('bb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let expectAddress = hex('878f20766bae2748efa77824b8c4f51513aee3eb')
        let actualAddress = _buildApeSwap(lnxAddress, wbnbAddress)

        assert.strictEqual(
            actualAddress.equals(expectAddress),
            true
        )
    })

    it('FAKEBTC-FAKEBUSD', () => {
        let fakebtcAddress = hex('d4f9cfeeb91ec4d75e1d8b6ef79a0ac99aa6bd65')
        let fakebusdAddress = hex('13221778dd4c06315a7922cae6ee939800d9c9d6')
        let expectAddress = hex('0a7df81c7fe79d16916710e338dceb5d9c18588a')
        let actualAddress = _buildApeSwap(fakebtcAddress, fakebusdAddress)

        assert.strictEqual(
            actualAddress.equals(expectAddress),
            true
        )
    })

    it('Different address position return the same result', () => {
        let lnxAddress = hex('c465503b2f65cc67a070f9afe3f095f2d1e49331')
        let wbnbAddress = hex('bb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let expectAddress = hex('878f20766bae2748efa77824b8c4f51513aee3eb')
        let actualAddress1 = _buildApeSwap(lnxAddress, wbnbAddress)
        let actualAddress2 = _buildApeSwap(wbnbAddress, lnxAddress)

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
