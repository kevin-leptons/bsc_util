/*eslint-disable max-len*/

'use strict'

const assert = require('assert')
const {_getPoolAddressCafe} = require('../')
const {heximalToBuffer} = require('./_lib')

describe('_getPoolAddressCafe', () => {
    it('CORONAS/WBNB', () => {
        let busdAddress = heximalToBuffer('0x55d398326f99059ff775485246999027b3197955')
        let usdcAddress = heximalToBuffer('0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d')
        let expectAddress = heximalToBuffer('0x95df5fef2154f43596f70c4b92b444e5f540afb6')
        let actualAddress = _getPoolAddressCafe(busdAddress, usdcAddress)

        assert.deepStrictEqual(actualAddress, expectAddress)
    })

    it('BET/BUSD', () => {
        let wbnbAddress = heximalToBuffer('0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let mercury = heximalToBuffer('0xd8158c380d8d05e47bebe06ffe1f73ba5268dc32')
        let expectAddress = heximalToBuffer('0x2fa5ab464feea37feaf0b4232bd2b9325d9ba2d9')
        let actualAddress = _getPoolAddressCafe(wbnbAddress, mercury)

        assert.deepStrictEqual(actualAddress, expectAddress)
    })

    it('Different addresses order, return the same result', () => {
        let usdtAddress = heximalToBuffer('0x23396cf899ca06c4472205fc903bdb4de249d6fc')
        let usdcAddress = heximalToBuffer('0x55d398326f99059ff775485246999027b3197955')
        let expectAddress = heximalToBuffer('0x85d2e6d17162275740e1e630933306ce50967073')
        let actualAddress1 = _getPoolAddressCafe(usdtAddress, usdcAddress)
        let actualAddress2 = _getPoolAddressCafe(usdcAddress, usdtAddress)

        assert.deepStrictEqual(actualAddress1, expectAddress)
        assert.deepStrictEqual(actualAddress2, expectAddress)
    })
})
