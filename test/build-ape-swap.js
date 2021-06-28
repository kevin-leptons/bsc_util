'use strict'

const assert = require('assert')
const {_buildApeSwap} = require('../')

describe('_buildApeSwap', () => {
    it('ART-HST', () => {
        let artAddress = '0x36fb4fa5d09fba8beaced0f15397a2b023d9d4b1'
        let hstAddress = '0xabd6f436bae8539f5b5979b28ed2e3097401f593'
        let expectAddress = '0xa7468f37ccfd6047807ec002b1c85de484357a49'
        let actualAddress = _buildApeSwap(artAddress, hstAddress)

        assert.strictEqual(actualAddress, expectAddress)
    })

    it('MAGIC-WBNB', () => {
        let magicAddress = '0x6315df60391b1beef6d24b1df59bc81389ad055b'
        let busdAddress = '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee'
        let expectAddress = '0x9ff4ef78156f27b2c479d69df18854cae243c1b3'
        let actualAddress = _buildApeSwap(magicAddress, busdAddress)

        assert.strictEqual(actualAddress, expectAddress)
    })

    it('Different address position return the same result', () => {
        let magicAddress = '0x6315df60391b1beef6d24b1df59bc81389ad055b'
        let busdAddress = '0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee'
        let expectAddress = '0x9ff4ef78156f27b2c479d69df18854cae243c1b3'
        let actualAddress1 = _buildApeSwap(magicAddress, busdAddress)
        let actualAddress2 = _buildApeSwap(busdAddress, magicAddress)

        assert.strictEqual(actualAddress1, actualAddress2)
        assert.strictEqual(actualAddress1, expectAddress)
    })
})
