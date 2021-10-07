'use strict'

const assert = require('assert')
const {findPairBuffer} = require('../')
const {hex} = require('./util')

describe('findPairBuffer', () => {
    it('Not supported factory throws error', () => {
        let invalidFactory = 'coca cola'
        let wbnbAddress = hex('bb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let dotAddress = hex('7083609fce4d1d8dc0c979aab8c869ea2c873402')

        assert.throws(
            () => {
                findPairBuffer(invalidFactory, wbnbAddress, dotAddress)
            },
            {
                name: 'Error',
                message: 'Invalid factory'
            }
        )
    })

    it('First address is not a buffer throws error', () => {
        let invalidAddress = '0x0e09fabb73bd3ade0a17ecc321fd13a19e81cXXX'
        let wbnbAddress = hex('bb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')

        assert.throws(
            () => {
                findPairBuffer('pancake', invalidAddress, wbnbAddress)
            },
            {
                name: 'Error',
                message: 'Invalid ETH buffer address'
            }
        )
    })

    it('Second address has non hex symbol throws error', () => {
        let cakeAddress = hex('0e09fabb73bd3ade0a17ecc321fd13a19e81ce82')
        let invalidAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc0XXX'

        assert.throws(
            () => {
                findPairBuffer('pancake', cakeAddress, invalidAddress)
            },
            {
                name: 'Error',
                message: 'Invalid ETH buffer address'
            }
        )
    })

    it('First address is too long buffer throws error', () => {
        let invalidAddress = hex('7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c00')
        let wbnbAddress = hex('bb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')

        assert.throws(
            () => {
                findPairBuffer('pancake', invalidAddress, wbnbAddress)
            },
            {
                name: 'Error',
                message: 'Invalid ETH buffer address'
            }
        )
    })

    it('Second address is too long throw error', () => {
        let wbnbAddress = hex('bb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let invalidAddress = hex('7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c000')

        assert.throws(
            () => {
                findPairBuffer('pancake', wbnbAddress, invalidAddress)
            },
            {
                name: 'Error',
                message: 'Invalid ETH buffer address'
            }
        )
    })

    it('First address is too short throw error', () => {
        let invalidAddress = hex('12')
        let wbnbAddress = hex('bb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')

        assert.throws(
            () => {
                findPairBuffer('pancake', invalidAddress, wbnbAddress)
            },
            {
                name: 'Error',
                message: 'Invalid ETH buffer address'
            }
        )
    })

    it('Second address is too short throw error', () => {
        let wbnbAddress = hex('bb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let invalidAddress = hex('34')

        assert.throws(
            () => {
                findPairBuffer('pancake', wbnbAddress, invalidAddress)
            },
            {
                name: 'Error',
                message: 'Invalid ETH buffer address'
            }
        )
    })

    it('First address is zero throw error', () => {
        let zeroAddress = hex('0000000000000000000000000000000000000000')
        let btcbAddress = hex('7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c')

        assert.throws(
            () => {
                findPairBuffer('pancake', zeroAddress, btcbAddress)
            },
            {
                name: 'Error',
                message: 'Not accepted zero address'
            }
        )
    })

    it('Second address is zero throw error', () => {
        let btcbAddress = hex('7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c')
        let zeroAddress = hex('0000000000000000000000000000000000000000')

        assert.throws(
            () => {
                findPairBuffer('pancake', btcbAddress, zeroAddress)
            },
            {
                name: 'Error',
                message: 'Not accepted zero address'
            }
        )
    })

    it('Addresses are the same throw error', () => {
        let btcbAddress = hex('7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c')

        assert.throws(
            () => {
                findPairBuffer('pancake', btcbAddress, btcbAddress)
            },
            {
                name: 'Error',
                message: 'Not identical address'
            }
        )
    })

    it('PancakeSwap V1 factory', () => {
        let cakeAddress = hex('0e09fabb73bd3ade0a17ecc321fd13a19e81ce82')
        let wbnbAddress = hex('bb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let expectAddress = hex('A527a61703D82139F8a06Bc30097cC9CAA2df5A6')
        let actualAddress = findPairBuffer('pancake', cakeAddress, wbnbAddress)

        assert.deepStrictEqual(actualAddress, expectAddress)
    })

    it('PancakeSwap V2 factory', () => {
        let cakeAddress = hex('0e09fabb73bd3ade0a17ecc321fd13a19e81ce82')
        let wbnbAddress = hex('bb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let expectAddress = hex('0eD7e52944161450477ee417DE9Cd3a859b14fD0')
        let actualAddress = findPairBuffer('pancake2', cakeAddress, wbnbAddress)

        assert.deepStrictEqual(actualAddress, expectAddress)
    })

    it('Burger factory', () => {
        let imoAddress = hex('6bdd25b0b786ff3e992baa1a2cb6cc41f61d6737')
        let wbnbAddress = hex('bb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let expectAddress = hex('24E6212664ff264EaeBb53926811680d1d9e6AC5')
        let actualAddress = findPairBuffer('burger', imoAddress, wbnbAddress)

        assert.deepStrictEqual(actualAddress, expectAddress)
    })

    it('JulSwap factory', () => {
        let cakeAddress = hex('0e09fabb73bd3ade0a17ecc321fd13a19e81ce82')
        let ePycAddress = hex('322895d51479e5de68cc3492bf0dea07c549a0e2')
        let expectAddress = hex('f17AD5dAd9293523d6D99a14Add6Cec43f943603')
        let actualAddress = findPairBuffer('jul', cakeAddress, ePycAddress)

        assert.deepStrictEqual(actualAddress, expectAddress)
    })

    it('ApeSwap factory', () => {
        let lnxAddress = hex('c465503b2f65cc67a070f9afe3f095f2d1e49331')
        let wbnbAddress = hex('bb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let expectAddress = hex('878f20766BaE2748eFA77824b8c4f51513aEe3eB')
        let actualAddress = findPairBuffer('ape', lnxAddress, wbnbAddress)

        assert.deepStrictEqual(actualAddress, expectAddress)
    })

    it('BakerySwap factory', () => {
        let wbnbAddress = hex('bb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let clownAddress = hex('fa949ef822125233f1e1a0691c13977b4354b257')
        let expectAddress = hex('9d311dd545Ae8b39e86ed3733eDfe4D5B7f27e0a')
        let actualAddress = findPairBuffer('bakery', wbnbAddress, clownAddress)

        assert.deepStrictEqual(actualAddress, expectAddress)
    })
})
