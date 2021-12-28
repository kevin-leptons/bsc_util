'use strict'

const assert = require('assert')
const {toEthAddress} = require('../../lib/formatter')

describe('formatter.toEthAddress', () => {
    it('not a string, throws error', () => {
        let heximal = 1357

        assert.throws(
            () => toEthAddress(heximal),
            {
                name: 'Error',
                message: 'heximal ETH address is not a string'
            }
        )
    })

    it('has no prefix 0x, throws error', () => {
        let heximal = '03FB'

        assert.throws(
            () => toEthAddress(heximal),
            {
                name: 'Error',
                message: 'heximal ETH address does not match pattern'
            }
        )
    })

    it('has invalid symbols, throws error', () => {
        let heximal = '0x0387f4084b2385b4181f87d7e601a7f5ca9cXXXX'

        assert.throws(
            () => toEthAddress(heximal),
            {
                name: 'Error',
                message: 'heximal ETH address does not match pattern'
            }
        )
    })

    it('too short, throws error', () => {
        let heximal = '0x1'

        assert.throws(
            () => toEthAddress(heximal),
            {
                name: 'Error',
                message: 'heximal ETH address does not match pattern'
            }
        )
    })

    it('too long, throws error', () => {
        let heximal = '0x0387f4084b2385b4181f87d7e601a7f5ca9caa59FFFFF'

        assert.throws(
            () => toEthAddress(heximal),
            {
                name: 'Error',
                message: 'heximal ETH address does not match pattern'
            }
        )
    })

    it('start with zero digits, return correct result', () => {
        let heximal = '0x000000000000000000000000000000000000000f'
        let expectedResult = Buffer.from([
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 15
        ])
        let actualResult = toEthAddress(heximal)

        assert.deepStrictEqual(actualResult, expectedResult)
    })

    it('start with non zero digits, return correct result', () => {
        let heximal = '0x100000000000000000000000000000000000000f'
        let expectedResult = Buffer.from([
            16, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 15
        ])
        let actualResult = toEthAddress(heximal)

        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
