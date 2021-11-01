/*eslint-disable max-len*/

'use strict'

const assert = require('assert')
const {_getPoolAddressMdex} = require('../')
const {heximalToBuffer} = require('./_lib')

describe('_getPoolAddressMdex', () => {
    it('CORONAS/WBNB', () => {
        let coronaAddress = heximalToBuffer('0x9d4a0951e0a5101b0284d8b5a3d51f97f4d1b503')
        let wbnbAddress = heximalToBuffer('0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let expectAddress = heximalToBuffer('0x24156e3d516bd0beafbfba3b50abe5356a185da9')
        let actualAddress = _getPoolAddressMdex(coronaAddress, wbnbAddress)

        assert.deepStrictEqual(actualAddress, expectAddress)
    })

    it('BET/BUSD', () => {
        let betAddress = heximalToBuffer('0x028a52032a7075a42585c037f069c62b49ebaa3d')
        let busdAddress = heximalToBuffer('0x55d398326f99059ff775485246999027b3197955')
        let expectAddress = heximalToBuffer('0x40050bc7c87a2e1669f8d55f607a145bd54fa4f4')
        let actualAddress = _getPoolAddressMdex(betAddress, busdAddress)

        assert.deepStrictEqual(actualAddress, expectAddress)
    })

    it('Different addresses order, return the same result', () => {
        let busdAddress = heximalToBuffer('0x55d398326f99059ff775485246999027b3197955')
        let ad2Address = heximalToBuffer('0xc4acd115f1ceebd4a88273423d6cf77c4a1c7559')
        let expectAddress = heximalToBuffer('0x193ab3992feee68f247a139f5a80cdbbd1980fd5')
        let actualAddress1 = _getPoolAddressMdex(busdAddress, ad2Address)
        let actualAddress2 = _getPoolAddressMdex(ad2Address, busdAddress)

        assert.deepStrictEqual(actualAddress1, expectAddress)
        assert.deepStrictEqual(actualAddress2, expectAddress)
    })
})
