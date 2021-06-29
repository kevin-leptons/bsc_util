'use strict'

const assert = require('assert')
const {_buildBakerySwap} = require('../')
const {hex} = require('./util')

describe('_buildBakerySwap', () => {
    it('DIVIDEND-WBNB', () => {
        let dividendAddress = hex('58babdb9eb83c87c1fffe5e59dcf5d69a11b2bea')
        let wbnbAddress = hex('bb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let expectAddress = hex('8c5e78c54ebb2146b1d6ebffc7448330c1e4663f')
        let actualAddress = _buildBakerySwap(dividendAddress, wbnbAddress)

        assert.strictEqual(
            actualAddress.equals(expectAddress),
            true
        )
    })

    it('WBNB-CLOWN', () => {
        let wbnbAddress = hex('bb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let clownAddress = hex('fa949ef822125233f1e1a0691c13977b4354b257')
        let expectAddress = hex('9d311dd545ae8b39e86ed3733edfe4d5b7f27e0a')
        let actualAddress = _buildBakerySwap(wbnbAddress, clownAddress)

        assert.strictEqual(
            actualAddress.equals(expectAddress),
            true
        )
    })

    it('Different address position return the same result', () => {
        let dividendAddress = hex('58babdb9eb83c87c1fffe5e59dcf5d69a11b2bea')
        let wbnbAddress = hex('bb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let expectAddress = hex('8c5e78c54ebb2146b1d6ebffc7448330c1e4663f')
        let actualAddress1 = _buildBakerySwap(dividendAddress, wbnbAddress)
        let actualAddress2 = _buildBakerySwap(wbnbAddress, dividendAddress)

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
