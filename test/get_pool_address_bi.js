/*eslint-disable max-len*/

'use strict'

const assert = require('assert')
const {_getPoolAddressBi} = require('../')
const {heximalToBuffer} = require('./_lib')

describe('_getPoolAddressBi', () => {
    it('FORM/BUSD', () => {
        let formAddress = heximalToBuffer('0x25a528af62e56512a19ce8c3cab427807c28cc19')
        let busdAddress = heximalToBuffer('0xe9e7cea3dedca5984780bafc599bd69add087d56')
        let expectAddress = heximalToBuffer('0x43c1e1a0998d9e025d899e71d5199b6f6911add3')
        let actualAddress = _getPoolAddressBi(formAddress, busdAddress)

        assert.deepStrictEqual(actualAddress, expectAddress)
    })

    it('WBNB/AD2', () => {
        let wbnbAddress = heximalToBuffer('0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let ad2Address = heximalToBuffer('0xc4acd115f1ceebd4a88273423d6cf77c4a1c7559')
        let expectAddress = heximalToBuffer('0x4ffd130df9c497b111f25d67d67e90e5e18f60ef')
        let actualAddress = _getPoolAddressBi(wbnbAddress, ad2Address)

        assert.deepStrictEqual(actualAddress, expectAddress)
    })

    it('Different addresses order, return the same result', () => {
        let usdcAddress = heximalToBuffer('0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d')
        let marblesAddress = heximalToBuffer('0x9531c509a24ceec710529645fc347341ff9f15ea')
        let expectAddress = heximalToBuffer('0x021ad7212496962c3059147009cd3085f16fee72')
        let actualAddress1 = _getPoolAddressBi(usdcAddress, marblesAddress)
        let actualAddress2 = _getPoolAddressBi(marblesAddress, usdcAddress)

        assert.deepStrictEqual(actualAddress1, expectAddress)
        assert.deepStrictEqual(actualAddress2, expectAddress)
    })
})
