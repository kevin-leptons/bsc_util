/*eslint-disable max-len*/

'use strict'

const assert = require('assert')
const {_getPoolAddressPancake2} = require('../')
const {heximalToBuffer} = require('./_lib')

describe('_getPoolAddressPancake2', () => {
    it('Cake/WBNB', () => {
        let cakeAddress = heximalToBuffer('0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82')
        let wbnbAddress = heximalToBuffer('0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let expectAddress = heximalToBuffer('0x0ed7e52944161450477ee417de9cd3a859b14fd0')
        let actualAddress = _getPoolAddressPancake2(cakeAddress, wbnbAddress)

        assert.strictEqual(
            actualAddress.equals(expectAddress),
            true
        )
    })

    it('BTC/WBNB', () => {
        let btcbAddress = heximalToBuffer('0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c')
        let wbnbAddress = heximalToBuffer('0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let expectAddress = heximalToBuffer('0x61eb789d75a95caa3ff50ed7e47b96c132fec082')
        let actualAddress = _getPoolAddressPancake2(btcbAddress, wbnbAddress)

        assert.strictEqual(
            actualAddress.equals(expectAddress),
            true
        )
    })

    it('Different addresses order, return the same result', () => {
        let btcbAddress = heximalToBuffer('0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c')
        let wbnbAddress = heximalToBuffer('0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let expectAddress = heximalToBuffer('0x61eb789d75a95caa3ff50ed7e47b96c132fec082')
        let actualAddress1 = _getPoolAddressPancake2(btcbAddress, wbnbAddress)
        let actualAddress2 = _getPoolAddressPancake2(wbnbAddress, btcbAddress)

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
