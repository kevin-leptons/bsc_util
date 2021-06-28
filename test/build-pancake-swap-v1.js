'use strict'

const assert = require('assert')
const {_buildPancakeSwapV1} = require('../')

describe('_buildPancakeSwapV1', () => {
    it('Cake-WBNB', () => {
        let cakeAddress = '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82'
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
        let expectAddress = '0xa527a61703d82139f8a06bc30097cc9caa2df5a6'
        let actualAddress = _buildPancakeSwapV1(cakeAddress, wbnbAddress)

        assert.strictEqual(actualAddress, expectAddress)
    })

    it('BTC-WBNB', () => {
        let btcbAddress = '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c'
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
        let expectAddress = '0x7561eee90e24f3b348e1087a005f78b4c8453524'
        let actualAddress = _buildPancakeSwapV1(btcbAddress, wbnbAddress)

        assert.strictEqual(actualAddress, expectAddress)
    })

    it('Different address position return the same result', () => {
        let btcbAddress = '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c'
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
        let expectAddress = '0x7561eee90e24f3b348e1087a005f78b4c8453524'
        let actualAddress1 = _buildPancakeSwapV1(btcbAddress, wbnbAddress)
        let actualAddress2 = _buildPancakeSwapV1(wbnbAddress, btcbAddress)

        assert.strictEqual(actualAddress1, actualAddress2)
        assert.strictEqual(actualAddress1, expectAddress)
    })
})
