/*eslint-disable max-len*/

'use strict'

const assert = require('assert')
const {_getPoolAddressJet} = require('../')
const {heximalToBuffer} = require('./_lib')

describe('_getPoolAddressJet', () => {
    it('BUSD/AD2', () => {
        let busdAddress = heximalToBuffer('0x55d398326f99059ff775485246999027b3197955')
        let ad2Address = heximalToBuffer('0xc4acd115f1ceebd4a88273423d6cf77c4a1c7559')
        let expectAddress = heximalToBuffer('0xedd292325acd24d045077ffcad2b1020db9bcec1')
        let actualAddress = _getPoolAddressJet(busdAddress, ad2Address)

        assert.deepStrictEqual(actualAddress, expectAddress)
    })

    it('WBNB/GRAND', () => {
        let wbnbAddress = heximalToBuffer('0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let grandAddress = heximalToBuffer('0xee814f5b2bf700d2e843dc56835d28d095161dd9')
        let expectAddress = heximalToBuffer('0x511b7b844527cb656f4c221ca93e90390099e255')
        let actualAddress = _getPoolAddressJet(wbnbAddress, grandAddress)

        assert.deepStrictEqual(actualAddress, expectAddress)
    })

    it('Different addresses order, return the same result', () => {
        let triiangleAddress = heximalToBuffer('0x4ba8abf9b4fc73f5a086f19d2a49611fdec0fe68')
        let wbnbAddress = heximalToBuffer('0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c')
        let expectAddress = heximalToBuffer('0x94694295b3a36909b2eb3aeb47dc87f8e6049bc2')
        let actualAddress1 = _getPoolAddressJet(triiangleAddress, wbnbAddress)
        let actualAddress2 = _getPoolAddressJet(wbnbAddress, triiangleAddress)

        assert.deepStrictEqual(actualAddress1, expectAddress)
        assert.deepStrictEqual(actualAddress2, expectAddress)
    })
})
