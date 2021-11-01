/*eslint-disable max-len*/

'use strict'

const assert = require('assert')
const {getPoolAddressHeximal} = require('../')

describe('getPoolAddressHeximal', () => {
    it('Not supported factory throw error', () => {
        let invalidFactory = 'coca cola'
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
        let dotAddress = '0x7083609fce4d1d8dc0c979aab8c869ea2c873402'

        assert.throws(
            () => {
                getPoolAddressHeximal(invalidFactory, wbnbAddress, dotAddress)
            },
            {
                name: 'Error',
                message: 'Invalid exchange'
            }
        )
    })

    it('First address has non hex symbol throw error', () => {
        let invalidAddress = '0x0e09fabb73bd3ade0a17ecc321fd13a19e81cXXX'
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'

        assert.throws(
            () => {
                getPoolAddressHeximal('pancake', invalidAddress, wbnbAddress)
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
                getPoolAddressHeximal('pancake', cakeAddress, invalidAddress)
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
                getPoolAddressHeximal('pancake', invalidAddress, wbnbAddress)
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
                getPoolAddressHeximal('pancake', wbnbAddress, invalidAddress)
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
                getPoolAddressHeximal('pancake', invalidAddress, wbnbAddress)
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
                getPoolAddressHeximal('pancake', wbnbAddress, invalidAddress)
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
                getPoolAddressHeximal('pancake', zeroAddress, btcbAddress)
            },
            {
                name: 'Error',
                message: 'Not accepted zero addresses'
            }
        )
    })

    it('Second address is zero throw error', () => {
        let btcbAddress = '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c'
        let zeroAddress = '0x0000000000000000000000000000000000000000'

        assert.throws(
            () => {
                getPoolAddressHeximal('pancake', btcbAddress, zeroAddress)
            },
            {
                name: 'Error',
                message: 'Not accepted zero addresses'
            }
        )
    })

    it('Addresses are the same throw error', () => {
        let btcbAddress = '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c'

        assert.throws(
            () => {
                getPoolAddressHeximal('pancake', btcbAddress, btcbAddress)
            },
            {
                name: 'Error',
                message: 'Not identical addresses'
            }
        )
    })

    it('Address with prefix "0x"', () => {
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
        let dotAddress = '0x7083609fce4d1d8dc0c979aab8c869ea2c873402'
        let expectAddress = '0xbCD62661A6b1DEd703585d3aF7d7649Ef4dcDB5c'
        let actualAddress = getPoolAddressHeximal('pancake', wbnbAddress, dotAddress)

        assert.strictEqual(actualAddress, expectAddress)
    })

    it('Address without prefix "0x"', () => {
        let wbnbAddress = 'bb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
        let dotAddress = '7083609fce4d1d8dc0c979aab8c869ea2c873402'
        let expectAddress = '0xbCD62661A6b1DEd703585d3aF7d7649Ef4dcDB5c'
        let actualAddress = getPoolAddressHeximal('pancake', wbnbAddress, dotAddress)

        assert.strictEqual(actualAddress, expectAddress)
    })

    it('Checksum address', () => {
        let wbnbAddress = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'
        let dotAddress = '0x7083609fCE4d1d8Dc0C979AAb8c869Ea2C873402'
        let expectAddress = '0xbCD62661A6b1DEd703585d3aF7d7649Ef4dcDB5c'
        let actualAddress = getPoolAddressHeximal('pancake', wbnbAddress, dotAddress)

        assert.strictEqual(actualAddress, expectAddress)
    })

    it('Pancake V1 exchange', () => {
        let cakeAddress = '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82'
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
        let expectAddress = '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6'
        let actualAddress = getPoolAddressHeximal('pancake', cakeAddress, wbnbAddress)

        assert.strictEqual(actualAddress, expectAddress)
    })

    it('Pancake V2 exchange', () => {
        let cakeAddress = '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82'
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
        let expectAddress = '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0'
        let actualAddress = getPoolAddressHeximal('pancake2', cakeAddress, wbnbAddress)

        assert.strictEqual(actualAddress, expectAddress)
    })

    it('Bakery exchange', () => {
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
        let clownAddress = '0xfa949ef822125233f1e1a0691c13977b4354b257'
        let expectAddress = '0x9d311dd545Ae8b39e86ed3733eDfe4D5B7f27e0a'
        let actualAddress = getPoolAddressHeximal('bakery', wbnbAddress, clownAddress)

        assert.strictEqual(actualAddress, expectAddress)
    })

    it('JulS exchange', () => {
        let cakeAddress = '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82'
        let ePycAddress = '0x322895d51479e5de68cc3492bf0dea07c549a0e2'
        let expectAddress = '0xf17AD5dAd9293523d6D99a14Add6Cec43f943603'
        let actualAddress = getPoolAddressHeximal('jul', cakeAddress, ePycAddress)

        assert.strictEqual(actualAddress, expectAddress)
    })

    it('Ape exchange', () => {
        let lnxAddress = '0xc465503b2f65cc67a070f9afe3f095f2d1e49331'
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
        let expectAddress = '0x878f20766BaE2748eFA77824b8c4f51513aEe3eB'
        let actualAddress = getPoolAddressHeximal('ape', lnxAddress, wbnbAddress)

        assert.strictEqual(actualAddress, expectAddress)
    })

    it('Burger exchange', () => {
        let imoAddress = '0x6bdd25b0b786ff3e992baa1a2cb6cc41f61d6737'
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
        let expectAddress = '0x24E6212664ff264EaeBb53926811680d1d9e6AC5'
        let actualAddress = getPoolAddressHeximal('burger', imoAddress, wbnbAddress)

        assert.strictEqual(actualAddress, expectAddress)
    })

    it('Bi exchange', () => {
        let formAddress = '0x25a528af62e56512a19ce8c3cab427807c28cc19'
        let busdAddress = '0xe9e7cea3dedca5984780bafc599bd69add087d56'
        let expectAddress = '0x43C1E1a0998d9E025d899E71d5199b6F6911ADd3'
        let actualAddress = getPoolAddressHeximal('bi', formAddress, busdAddress)

        assert.deepStrictEqual(actualAddress, expectAddress)
    })

    it('Mdex exchange', () => {
        let betAddress = '0x028a52032a7075a42585c037f069c62b49ebaa3d'
        let busdAddress = '0x55d398326f99059ff775485246999027b3197955'
        let expectAddress = '0x40050bc7C87a2e1669F8D55f607a145bD54fa4f4'
        let actualAddress = getPoolAddressHeximal('mdex', betAddress, busdAddress)

        assert.deepStrictEqual(actualAddress, expectAddress)
    })

    it('Cafe exchange', () => {
        let usdtAddress = '0x23396cf899ca06c4472205fc903bdb4de249d6fc'
        let usdcAddress = '0x55d398326f99059ff775485246999027b3197955'
        let expectAddress = '0x85D2E6D17162275740e1e630933306ce50967073'
        let actualAddress = getPoolAddressHeximal('cafe', usdtAddress, usdcAddress)

        assert.deepStrictEqual(actualAddress, expectAddress)
    })

    it('Jet exchange', () => {
        let busdAddress = '0x55d398326f99059ff775485246999027b3197955'
        let ad2Address = '0xc4acd115f1ceebd4a88273423d6cf77c4a1c7559'
        let expectAddress = '0xEdd292325AcD24d045077fFcaD2B1020DB9Bcec1'
        let actualAddress = getPoolAddressHeximal('jet', busdAddress, ad2Address)

        assert.deepStrictEqual(actualAddress, expectAddress)
    })
})
