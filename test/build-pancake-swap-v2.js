'use strict'

const assert = require('assert')
const {_buildPancakeSwapV2} = require('../')

describe('_buildPancakeSwapV2', () => {
    it('Cake-WBNB', () => {
        let cakeAddress = '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82'
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
        let expectAddress = '0x0ed7e52944161450477ee417de9cd3a859b14fd0'
        let actualAddress = _buildPancakeSwapV2(cakeAddress, wbnbAddress)

        assert.strictEqual(actualAddress, expectAddress)
    })

    it('BTC-WBNB', () => {
        let btcbAddress = '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c'
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
        let expectAddress = '0x61eb789d75a95caa3ff50ed7e47b96c132fec082'
        let actualAddress = _buildPancakeSwapV2(btcbAddress, wbnbAddress)

        assert.strictEqual(actualAddress, expectAddress)
    })

    it('Different address position return the same result', () => {
        let btcbAddress = '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c'
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
        let expectAddress = '0x61eb789d75a95caa3ff50ed7e47b96c132fec082'
        let actualAddress1 = _buildPancakeSwapV2(btcbAddress, wbnbAddress)
        let actualAddress2 = _buildPancakeSwapV2(wbnbAddress, btcbAddress)

        assert.strictEqual(actualAddress1, actualAddress2)
        assert.strictEqual(actualAddress1, expectAddress)
    })
})
