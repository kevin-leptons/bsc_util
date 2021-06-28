'use strict'

const assert = require('assert')
const {findPair} = require('../')

describe('findPair', () => {
    it('Addresses are the same throw error', () => {
        let btcbAddress = '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c'

        assert.throws(
            () => {
                findPair('pancake', btcbAddress, btcbAddress)
            },
            {
                name: 'Error',
                message: 'Not identical address'
            }
        )
    })

    it('First address is zero throw error', () => {
        let zeroAddress = '0x0000000000000000000000000000000000000000'
        let btcbAddress = '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c'

        assert.throws(
            () => {
                findPair('pancake', zeroAddress, btcbAddress)
            },
            {
                name: 'Error',
                message: 'Not accepted zero address'
            }
        )
    })

    it('Second address is zero throw error', () => {
        let zeroAddress = '0x0000000000000000000000000000000000000000'
        let btcbAddress = '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c'

        assert.throws(
            () => {
                findPair('pancake', btcbAddress, zeroAddress)
            },
            {
                name: 'Error',
                message: 'Not accepted zero address'
            }
        )
    })

    it('First address is missing prefix "0x" throw error', () => {
        let invalidAddress = '7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c'
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'

        assert.throws(
            () => {
                findPair('pancake', invalidAddress, wbnbAddress)
            },
            {
                name: 'Error',
                message: 'Invalid token address'
            }
        )
    })

    it('Second address is missing prefix "0x" throw error', () => {
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
        let invalidAddress = '7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c'

        assert.throws(
            () => {
                findPair('pancake', wbnbAddress, invalidAddress)
            },
            {
                name: 'Error',
                message: 'Invalid token address'
            }
        )
    })

    it('First address has invalid symbol throw error', () => {
        let invalidAddress = '0xwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'

        assert.throws(
            () => {
                findPair('pancake', invalidAddress, wbnbAddress)
            },
            {
                name: 'Error',
                message: 'Invalid token address'
            }
        )
    })

    it('Second address has invalid symbol throw error', () => {
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
        let invalidAddress = '0xwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'

        assert.throws(
            () => {
                findPair('pancake', wbnbAddress, invalidAddress)
            },
            {
                name: 'Error',
                message: 'Invalid token address'
            }
        )
    })

    it('First address is too long throw error', () => {
        let invalidAddress = '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9cAAA'
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'

        assert.throws(
            () => {
                findPair('pancake', invalidAddress, wbnbAddress)
            },
            {
                name: 'Error',
                message: 'Invalid token address'
            }
        )
    })

    it('Second address is too long throw error', () => {
        let invalidAddress = '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c'
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095cAAA'

        assert.throws(
            () => {
                findPair('pancake', invalidAddress, wbnbAddress)
            },
            {
                name: 'Error',
                message: 'Invalid token address'
            }
        )
    })

    it('First address is too short throw error', () => {
        let invalidAddress = '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ea'
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'

        assert.throws(
            () => {
                findPair('pancake', invalidAddress, wbnbAddress)
            },
            {
                name: 'Error',
                message: 'Invalid token address'
            }
        )
    })

    it('Second address is too short throw error', () => {
        let invalidAddress = '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c'
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc0'

        assert.throws(
            () => {
                findPair('pancake', invalidAddress, wbnbAddress)
            },
            {
                name: 'Error',
                message: 'Invalid token address'
            }
        )
    })

    it('PancakeSwap V1 factory', () => {
        let cakeAddress = '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82'
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
        let expectAddress = '0xa527a61703d82139f8a06bc30097cc9caa2df5a6'
        let actualAddress = findPair('pancake', cakeAddress, wbnbAddress)

        assert.strictEqual(actualAddress, expectAddress)
    })

    it ('PancakeSwap V2 factory', () => {
        let cakeAddress = '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82'
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
        let expectAddress = '0x0ed7e52944161450477ee417de9cd3a859b14fd0'
        let actualAddress = findPair('pancake2', cakeAddress, wbnbAddress)

        assert.strictEqual(actualAddress, expectAddress)
    })

    it('Burger factory', () => {
        let imoAddress = '0x6bdd25b0b786ff3e992baa1a2cb6cc41f61d6737'
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
        let expectAddress = '0x24e6212664ff264eaebb53926811680d1d9e6ac5'
        let actualAddress = findPair('burger', imoAddress, wbnbAddress)

        assert.strictEqual(actualAddress, expectAddress)
    })

    it('JulSwap factory', () => {
        let cakeAddress = '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82'
        let ePycAddress = '0x322895d51479e5de68cc3492bf0dea07c549a0e2'
        let expectAddress = '0xf17ad5dad9293523d6d99a14add6cec43f943603'
        let actualAddress = findPair('jul', cakeAddress, ePycAddress)

        assert.strictEqual(actualAddress, expectAddress)
    })

    it('ApeSwap factory', () => {
        let artAddress = '0x36fb4fa5d09fba8beaced0f15397a2b023d9d4b1'
        let hstAddress = '0xabd6f436bae8539f5b5979b28ed2e3097401f593'
        let expectAddress = '0xa7468f37ccfd6047807ec002b1c85de484357a49'
        let actualAddress = findPair('ape', artAddress, hstAddress)

        assert.strictEqual(actualAddress, expectAddress)
    })
})
