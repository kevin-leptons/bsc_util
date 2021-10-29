'use strict'

const assert = require('assert')
const {getExchangeAmount} = require('../')

describe('getExchangeAmount', () => {
    it('exchange 100 for 1000/1010', () => {
        let a1 = getExchangeAmount('pancake', 100, 1000, 1010)

        assert.strictEqual(a1, '91.65120931078377886889')
    })

    it('exchange 0', () => {
        let a1 = getExchangeAmount('pancake', 0, 1000, 1000)

        assert.strictEqual(a1, '0')
    })

    it('exchange with low price', () => {
        let a1 = getExchangeAmount('pancake', 100, 1000, 10000)

        assert.strictEqual(a1, '907.43771594835424622659')
    })

    it('exchange with high price', () => {
        let a1 = getExchangeAmount('pancake', 100, 10000, 1000)

        assert.strictEqual(a1, '9.88138378977801540625')
    })

    it('invalid exchange throws error', () => {
        assert.throws(
            () => {
                getExchangeAmount('this-is-invalid-name', 100, 1000, 1000)
            },
            {
                message: 'Invalid exchange'
            }
        )
    })

    it('negative input amount throws error', () => {
        assert.throws(
            () => {
                getExchangeAmount('pancake', -1, 1000, 1000)
            },
            {
                message: 'Invalid input amount'
            }
        )
    })

    it('zero reserve of input token throws error', () => {
        assert.throws(
            () => {
                getExchangeAmount('pancake', 100, 0, 1000)
            },
            {
                message: 'Invalid reserves'
            }
        )
    })

    it('zero reserve of output token throws error', () => {
        assert.throws(
            () => {
                getExchangeAmount('pancake', 100, 1000, 0)
            },
            {
                message: 'Invalid reserves'
            }
        )
    })

    it('negative reserve of input token throws error', () => {
        assert.throws(
            () => {
                getExchangeAmount('pancake', 100, -1, 1000)
            },
            {
                message: 'Invalid reserves'
            }
        )
    })

    it('negative reserve of output token throws error', () => {
        assert.throws(
            () => {
                getExchangeAmount('pancake', 100, 1000, -1)
            },
            {
                message: 'Invalid reserves'
            }
        )
    })

    it('exchange on pancake', () => {
        let a1 = getExchangeAmount('pancake', 100, 10000, 10100)

        assert.strictEqual(a1, '99.80197627675795560308')
    })

    it('exchange on pancake v2', () => {
        let a1 = getExchangeAmount('pancake2', 100, 10000, 10100)

        assert.strictEqual(a1, '99.75246912052278521746')
    })

    it('exchange on bakery', () => {
        let a1 = getExchangeAmount('bakery', 100, 10000, 10100)

        assert.strictEqual(a1, '99.7029614741031911839')
    })

    it('exchange on jul', () => {
        let a1 = getExchangeAmount('jul', 100, 10000, 10100)

        assert.strictEqual(a1, '99.7029614741031911839')
    })

    it('exchange on ape', () => {
        let a1 = getExchangeAmount('ape', 100, 10000, 10100)

        assert.strictEqual(a1, '99.80197627675795560308')
    })
})
