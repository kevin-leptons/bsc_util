/*eslint-disable max-len*/

'use strict'

const assert = require('assert')
const {_getPoolAddressBakery} = require('../')
const {heximalToBuffer} = require('./_lib')

describe('_getPoolAddressBakery', () => {
    it('DIVIDEND/WBNB', () => {
        let dividendAddress = heximalToBuffer('0x58babdb9eb83c87c1fffe5e59dcf5d69a11b2bea')
        let wbnbAddress = heximalToBuffer('0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let expectAddress = heximalToBuffer('0x8c5e78c54ebb2146b1d6ebffc7448330c1e4663f')
        let actualAddress = _getPoolAddressBakery(dividendAddress, wbnbAddress)

        assert.strictEqual(
            actualAddress.equals(expectAddress),
            true
        )
    })

    it('WBNB/CLOWN', () => {
        let wbnbAddress = heximalToBuffer('0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let clownAddress = heximalToBuffer('0xfa949ef822125233f1e1a0691c13977b4354b257')
        let expectAddress = heximalToBuffer('0x9d311dd545ae8b39e86ed3733edfe4d5b7f27e0a')
        let actualAddress = _getPoolAddressBakery(wbnbAddress, clownAddress)

        assert.strictEqual(
            actualAddress.equals(expectAddress),
            true
        )
    })

    it('Different addresses order, return the same result', () => {
        let dividendAddress = heximalToBuffer('0x58babdb9eb83c87c1fffe5e59dcf5d69a11b2bea')
        let wbnbAddress = heximalToBuffer('0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let expectAddress = heximalToBuffer('0x8c5e78c54ebb2146b1d6ebffc7448330c1e4663f')
        let actualAddress1 = _getPoolAddressBakery(dividendAddress, wbnbAddress)
        let actualAddress2 = _getPoolAddressBakery(wbnbAddress, dividendAddress)

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
