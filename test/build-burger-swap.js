'use strict'

const assert = require('assert')
const {_buildBurgerSwap} = require('../')
const {hex} = require('./util')

describe('_buildBurgerSwap', () => {
    it('IMO-BUSD', () => {
        let imoAddress = hex('6bdd25b0b786ff3e992baa1a2cb6cc41f61d6737')
        let wbnbAddress = hex('bb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let expectAddress = hex('24e6212664ff264eaebb53926811680d1d9e6ac5')
        let actualAddress = _buildBurgerSwap(imoAddress, wbnbAddress)

        assert.strictEqual(
            actualAddress.equals(expectAddress),
            true
        )
    })

    it('asd-BURGER', () => {
        let imoAddress = hex('22e8dadac6f526a804a5f8548b6dd217772c2488')
        let wbnbAddress = hex('ae9269f27437f0fcbc232d39ec814844a51d6b8f')
        let expectAddress = hex('f9d45bba7b401ab11dd6863c916f28e78a1fc225')
        let actualAddress = _buildBurgerSwap(imoAddress, wbnbAddress)

        assert.strictEqual(
            actualAddress.equals(expectAddress),
            true
        )
    })

    it('Different address position return the same result', () => {
        let imoAddress = hex('22e8dadac6f526a804a5f8548b6dd217772c2488')
        let wbnbAddress = hex('ae9269f27437f0fcbc232d39ec814844a51d6b8f')
        let expectAddress = hex('f9d45bba7b401ab11dd6863c916f28e78a1fc225')
        let actualAddress1 = _buildBurgerSwap(imoAddress, wbnbAddress)
        let actualAddress2 = _buildBurgerSwap(wbnbAddress, imoAddress)

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
