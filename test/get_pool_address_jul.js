/*eslint-disable max-len*/

'use strict'

const assert = require('assert')
const {_getPoolAddressJul} = require('../')
const {heximalToBuffer} = require('./_lib')

describe('_getPoolAddressJul', () => {
    it('EUSD/BUSD', () => {
        let eusdAddress = heximalToBuffer('0xa1fd12820f0c1c492dd87f8a0d12043d8f24f8a6')
        let wbnbAddress = heximalToBuffer('0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let expectAddress = heximalToBuffer('0xf0674b5c92c637a62752f13c980bd706f94a2eee')
        let actualAddress = _getPoolAddressJul(eusdAddress, wbnbAddress)

        assert.strictEqual(
            actualAddress.equals(expectAddress),
            true
        )
    })

    it('Cake/ePYC', () => {
        let cakeAddress = heximalToBuffer('0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82')
        let ePycAddress = heximalToBuffer('0x322895d51479e5de68cc3492bf0dea07c549a0e2')
        let expectAddress = heximalToBuffer('0xf17ad5dad9293523d6d99a14add6cec43f943603')
        let actualAddress = _getPoolAddressJul(cakeAddress, ePycAddress)

        assert.strictEqual(
            actualAddress.equals(expectAddress),
            true
        )
    })

    it('Different addresses order, return the same result', () => {
        let cakeAddress = heximalToBuffer('0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82')
        let ePycAddress = heximalToBuffer('0x322895d51479e5de68cc3492bf0dea07c549a0e2')
        let expectAddress = heximalToBuffer('0xf17ad5dad9293523d6d99a14add6cec43f943603')
        let actualAddress1 = _getPoolAddressJul(cakeAddress, ePycAddress)
        let actualAddress2 = _getPoolAddressJul(ePycAddress, cakeAddress)

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
