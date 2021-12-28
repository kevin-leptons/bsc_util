/*eslint-disable max-len*/

'use strict'

const assert = require('assert')
const {toFactoryInitCode} = require('../../lib/formatter')

describe('formatter.toFactoryInitCode', () => {
    it('not a string, throws error', () => {
        let heximal = 1357

        assert.throws(
            () => toFactoryInitCode(heximal),
            {
                name: 'Error',
                message: 'heximal factory init code is not a string'
            }
        )
    })

    it('has no prefix 0x, throws error', () => {
        let heximal = '03FB'

        assert.throws(
            () => toFactoryInitCode(heximal),
            {
                name: 'Error',
                message: 'heximal factory init code does not match pattern'
            }
        )
    })

    it('has invalid symbols, throws error', () => {
        let heximal = '0xb79bd22b39471b35c7350820b4381986820aae8dc4295a03a23445e95114XXXX'

        assert.throws(
            () => toFactoryInitCode(heximal),
            {
                name: 'Error',
                message: 'heximal factory init code does not match pattern'
            }
        )
    })

    it('too short, throws error', () => {
        let heximal = '0x1'

        assert.throws(
            () => toFactoryInitCode(heximal),
            {
                name: 'Error',
                message: 'heximal factory init code does not match pattern'
            }
        )
    })

    it('too long, throws error', () => {
        let heximal = '0xb79bd22b39471b35c7350820b4381986820aae8dc4295a03a23445e951140987FFFF'

        assert.throws(
            () => toFactoryInitCode(heximal),
            {
                name: 'Error',
                message: 'heximal factory init code does not match pattern'
            }
        )
    })

    it('start with zero digits, return correct result', () => {
        let heximal = '0x000000000000000000000000000000000000000000000000000000000000000f'
        let expectedResult = Buffer.from([
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 15
        ])
        let actualResult = toFactoryInitCode(heximal)

        assert.deepStrictEqual(actualResult, expectedResult)
    })

    it('start with non zero digits, return correct result', () => {
        let heximal = '0x100000000000000000000000000000000000000000000000000000000000000f'
        let expectedResult = Buffer.from([
            16, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 15
        ])
        let actualResult = toFactoryInitCode(heximal)

        assert.deepStrictEqual(actualResult, expectedResult)
    })
})
