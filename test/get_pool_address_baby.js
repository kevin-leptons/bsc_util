/*eslint-disable max-len*/

'use strict'

const assert = require('assert')
const {_getPoolAddressBaby} = require('../')
const {heximalToBuffer} = require('./_lib')

describe('_getPoolAddressBaby', () => {
    it('Cake/WBNB', () => {
        let cakeAddress = heximalToBuffer('0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82')
        let wbnbAddress = heximalToBuffer('0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let expectAddress = heximalToBuffer('0x8eea120384ace96a63e2f144ef7f9a6f2bbcff8f')
        let actualAddress = _getPoolAddressBaby(cakeAddress, wbnbAddress)

        assert.strictEqual(
            actualAddress.equals(expectAddress),
            true
        )
    })

    it('BTC/WBNB', () => {
        let btcbAddress = heximalToBuffer('0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c')
        let wbnbAddress = heximalToBuffer('0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let expectAddress = heximalToBuffer('0x7c728d5842c22bcdf59a0e32e7c4ce3fb2bc25c4')
        let actualAddress = _getPoolAddressBaby(btcbAddress, wbnbAddress)

        assert.strictEqual(
            actualAddress.equals(expectAddress),
            true
        )
    })

    it('Different addresses order, return the same result', () => {
        let btcbAddress = heximalToBuffer('0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c')
        let wbnbAddress = heximalToBuffer('0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let expectAddress = heximalToBuffer('0x7c728d5842c22bcdf59a0e32e7c4ce3fb2bc25c4')
        let actualAddress1 = _getPoolAddressBaby(btcbAddress, wbnbAddress)
        let actualAddress2 = _getPoolAddressBaby(wbnbAddress, btcbAddress)

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
