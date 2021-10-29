/*eslint-disable max-len*/

'use strict'

const assert = require('assert')
const {_getPoolAddressPancake} = require('../')
const {heximalToBuffer} = require('./_lib')

describe('_getPoolAddressPancake', () => {
    it('Cake/WBNB', () => {
        let cakeAddress = heximalToBuffer('0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82')
        let wbnbAddress = heximalToBuffer('0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let expectAddress = heximalToBuffer('0xa527a61703d82139f8a06bc30097cc9caa2df5a6')
        let actualAddress = _getPoolAddressPancake(cakeAddress, wbnbAddress)

        assert.strictEqual(
            actualAddress.equals(expectAddress),
            true
        )
    })

    it('BTC/WBNB', () => {
        let btcbAddress = heximalToBuffer('0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c')
        let wbnbAddress = heximalToBuffer('0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let expectAddress = heximalToBuffer('0x7561eee90e24f3b348e1087a005f78b4c8453524')
        let actualAddress = _getPoolAddressPancake(btcbAddress, wbnbAddress)

        assert.strictEqual(
            actualAddress.equals(expectAddress),
            true
        )
    })

    it('Different addresses order, return the same result', () => {
        let btcbAddress = heximalToBuffer('0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c')
        let wbnbAddress = heximalToBuffer('0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let expectAddress = heximalToBuffer('0x7561eee90e24f3b348e1087a005f78b4c8453524')
        let actualAddress1 = _getPoolAddressPancake(btcbAddress, wbnbAddress)
        let actualAddress2 = _getPoolAddressPancake(wbnbAddress, btcbAddress)

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
