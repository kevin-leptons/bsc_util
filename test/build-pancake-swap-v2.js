'use strict'

const assert = require('assert')
const {_buildPancakeSwapV2} = require('../')
const {hex} = require('./util')

describe('_buildPancakeSwapV2', () => {
    it('Cake-WBNB', () => {
        let cakeAddress = hex('0e09fabb73bd3ade0a17ecc321fd13a19e81ce82')
        let wbnbAddress = hex('bb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let expectAddress = hex('0ed7e52944161450477ee417de9cd3a859b14fd0')
        let actualAddress = _buildPancakeSwapV2(cakeAddress, wbnbAddress)

        assert.strictEqual(
            actualAddress.equals(expectAddress),
            true
        )
    })

    it('BTC-WBNB', () => {
        let btcbAddress = hex('7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c')
        let wbnbAddress = hex('bb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let expectAddress = hex('61eb789d75a95caa3ff50ed7e47b96c132fec082')
        let actualAddress = _buildPancakeSwapV2(btcbAddress, wbnbAddress)

        assert.strictEqual(
            actualAddress.equals(expectAddress),
            true
        )
    })

    it('Different address position return the same result', () => {
        let btcbAddress = hex('7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c')
        let wbnbAddress = hex('bb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let expectAddress = hex('61eb789d75a95caa3ff50ed7e47b96c132fec082')
        let actualAddress1 = _buildPancakeSwapV2(btcbAddress, wbnbAddress)
        let actualAddress2 = _buildPancakeSwapV2(wbnbAddress, btcbAddress)

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
