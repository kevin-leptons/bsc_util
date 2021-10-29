/*eslint-disable max-len*/

'use strict'

const assert = require('assert')
const {_getPoolAddressBurger} = require('../')
const {heximalToBuffer} = require('./_lib')

describe('_getPoolAddressBurger', () => {
    it('IMO/BUSD', () => {
        let imoAddress = heximalToBuffer('0x6bdd25b0b786ff3e992baa1a2cb6cc41f61d6737')
        let wbnbAddress = heximalToBuffer('0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let expectAddress = heximalToBuffer('0x24e6212664ff264eaebb53926811680d1d9e6ac5')
        let actualAddress = _getPoolAddressBurger(imoAddress, wbnbAddress)

        assert.strictEqual(
            actualAddress.equals(expectAddress),
            true
        )
    })

    it('asd/BURGER', () => {
        let asdAddress = heximalToBuffer('0x22e8dadac6f526a804a5f8548b6dd217772c2488')
        let burgerAddress = heximalToBuffer('0xae9269f27437f0fcbc232d39ec814844a51d6b8f')
        let expectAddress = heximalToBuffer('0xf9d45bba7b401ab11dd6863c916f28e78a1fc225')
        let actualAddress = _getPoolAddressBurger(asdAddress, burgerAddress)

        assert.strictEqual(
            actualAddress.equals(expectAddress),
            true
        )
    })

    it('Different addresses order, return the same result', () => {
        let asdAddress = heximalToBuffer('0x22e8dadac6f526a804a5f8548b6dd217772c2488')
        let burgerAddress = heximalToBuffer('0xae9269f27437f0fcbc232d39ec814844a51d6b8f')
        let expectAddress = heximalToBuffer('0xf9d45bba7b401ab11dd6863c916f28e78a1fc225')
        let actualAddress1 = _getPoolAddressBurger(asdAddress, burgerAddress)
        let actualAddress2 = _getPoolAddressBurger(burgerAddress, asdAddress)

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
