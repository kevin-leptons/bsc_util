'use strict'

const assert = require('assert')
const {_buildBurgerSwap} = require('../')

describe('_buildBurgerSwap', () => {
    it('IMO-BUSD', () => {
        let imoAddress = '0x6bdd25b0b786ff3e992baa1a2cb6cc41f61d6737'
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
        let expectAddress = '0x24e6212664ff264eaebb53926811680d1d9e6ac5'
        let actualAddress = _buildBurgerSwap(imoAddress, wbnbAddress)

        assert.strictEqual(actualAddress, expectAddress)
    })

    it('asd-BURGER', () => {
        let imoAddress = '0x22e8dadac6f526a804a5f8548b6dd217772c2488'
        let wbnbAddress = '0xae9269f27437f0fcbc232d39ec814844a51d6b8f'
        let expectAddress = '0xf9d45bba7b401ab11dd6863c916f28e78a1fc225'
        let actualAddress = _buildBurgerSwap(imoAddress, wbnbAddress)

        assert.strictEqual(actualAddress, expectAddress)
    })

    it('Different address position return the same result', () => {
        let imoAddress = '0x22e8dadac6f526a804a5f8548b6dd217772c2488'
        let wbnbAddress = '0xae9269f27437f0fcbc232d39ec814844a51d6b8f'
        let expectAddress = '0xf9d45bba7b401ab11dd6863c916f28e78a1fc225'
        let actualAddress1 = _buildBurgerSwap(imoAddress, wbnbAddress)
        let actualAddress2 = _buildBurgerSwap(wbnbAddress, imoAddress)

        assert.strictEqual(actualAddress1, actualAddress2)
        assert.strictEqual(actualAddress1, expectAddress)
    })
})
