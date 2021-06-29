'use strict'

const assert = require('assert')
const {findPair} = require('../')

describe('findPair', () => {
    it('Not supported factory throw error', () => {
        let invalidFactory = 'coca cola'
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
        let dotAddress = '0x7083609fce4d1d8dc0c979aab8c869ea2c873402'

        assert.throws(
            () => {
                findPair(invalidFactory, wbnbAddress, dotAddress)
            },
            {
                name: 'Error',
                message: 'Invalid factory'
            }
        )
    })

    it('First address has non hex symbol throw error', () => {
        let invalidAddress = '0x0e09fabb73bd3ade0a17ecc321fd13a19e81cXXX'
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'

        assert.throws(
            () => {
                findPair('pancake', invalidAddress, wbnbAddress)
            },
            {
                name: 'Error',
                message: 'Invalid ETH address'
            }
        )
    })

    it('Second address has non hex symbol throw error', () => {
        let cakeAddress = '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82'
        let invalidAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc0XXX'

        assert.throws(
            () => {
                findPair('pancake', cakeAddress, invalidAddress)
            },
            {
                name: 'Error',
                message: 'Invalid ETH address'
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
                message: 'Invalid ETH address'
            }
        )
    })

    it('Second address is too long throw error', () => {
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
        let invalidAddress = '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9caaa'

        assert.throws(
            () => {
                findPair('pancake', wbnbAddress, invalidAddress)
            },
            {
                name: 'Error',
                message: 'Invalid ETH address'
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
                message: 'Invalid ETH address'
            }
        )
    })

    it('Second address is too short throw error', () => {
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
        let invalidAddress = '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ea'

        assert.throws(
            () => {
                findPair('pancake', wbnbAddress, invalidAddress)
            },
            {
                name: 'Error',
                message: 'Invalid ETH address'
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
        let btcbAddress = '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c'
        let zeroAddress = '0x0000000000000000000000000000000000000000'

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

    it('Address with prefix "0x"', () => {
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
        let dotAddress = '0x7083609fce4d1d8dc0c979aab8c869ea2c873402'
        let expectAddress = '0xbCD62661A6b1DEd703585d3aF7d7649Ef4dcDB5c'
        let actualAddress = findPair('pancake', wbnbAddress, dotAddress)

        assert.strictEqual(actualAddress, expectAddress)
    })

    it('Address without prefix "0x"', () => {
        let wbnbAddress = 'bb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
        let dotAddress = '7083609fce4d1d8dc0c979aab8c869ea2c873402'
        let expectAddress = '0xbCD62661A6b1DEd703585d3aF7d7649Ef4dcDB5c'
        let actualAddress = findPair('pancake', wbnbAddress, dotAddress)

        assert.strictEqual(actualAddress, expectAddress)
    })

    it('Checksum address', () => {
        let wbnbAddress = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
        let dotAddress = '0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402'
        let expectAddress = '0xbCD62661A6b1DEd703585d3aF7d7649Ef4dcDB5c'
        let actualAddress = findPair('pancake', wbnbAddress, dotAddress)

        assert.strictEqual(actualAddress, expectAddress)
    })

    it('PancakeSwap V1 factory', () => {
        let cakeAddress = '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82'
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
        let expectAddress = '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6'
        let actualAddress = findPair('pancake', cakeAddress, wbnbAddress)

        assert.strictEqual(actualAddress, expectAddress)
    })

    it('PancakeSwap V2 factory', () => {
        let cakeAddress = '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82'
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
        let expectAddress = '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0'
        let actualAddress = findPair('pancake2', cakeAddress, wbnbAddress)

        assert.strictEqual(actualAddress, expectAddress)
    })

    it('Burger factory', () => {
        let imoAddress = '0x6bdd25b0b786ff3e992baa1a2cb6cc41f61d6737'
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
        let expectAddress = '0x24E6212664ff264EaeBb53926811680d1d9e6AC5'
        let actualAddress = findPair('burger', imoAddress, wbnbAddress)

        assert.strictEqual(actualAddress, expectAddress)
    })

    it('JulSwap factory', () => {
        let cakeAddress = '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82'
        let ePycAddress = '0x322895d51479e5de68cc3492bf0dea07c549a0e2'
        let expectAddress = '0xf17AD5dAd9293523d6D99a14Add6Cec43f943603'
        let actualAddress = findPair('jul', cakeAddress, ePycAddress)

        assert.strictEqual(actualAddress, expectAddress)
    })

    it('ApeSwap factory', () => {
        let lnxAddress = '0xc465503b2f65cc67a070f9afe3f095f2d1e49331'
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
        let expectAddress = '0x878f20766BaE2748eFA77824b8c4f51513aEe3eB'
        let actualAddress = findPair('ape', lnxAddress, wbnbAddress)

        assert.strictEqual(actualAddress, expectAddress)
    })

    it('BakerySwap factory', () => {
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
        let clownAddress = '0xfa949ef822125233f1e1a0691c13977b4354b257'
        let expectAddress = '0x9d311dd545Ae8b39e86ed3733eDfe4D5B7f27e0a'
        let actualAddress = findPair('bakery', wbnbAddress, clownAddress)

        assert.strictEqual(actualAddress, expectAddress)
    })
})
