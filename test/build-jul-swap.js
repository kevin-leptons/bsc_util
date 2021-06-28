'use strict'

const assert = require('assert')
const {_buildJulSwap} = require('../')

describe('_buildJulSwap', () => {
    it('EUSD-BUSD', () => {
        let eusdAddress = '0xa1fd12820f0c1c492dd87f8a0d12043d8f24f8a6'
        let wbnbAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'
        let expectAddress = '0xf0674b5c92c637a62752f13c980bd706f94a2eee'
        let actualAddress = _buildJulSwap(eusdAddress, wbnbAddress)

        assert.strictEqual(actualAddress, expectAddress)
    })

    it('Cake-ePYC', () => {
        let cakeAddress = '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82'
        let ePycAddress = '0x322895d51479e5de68cc3492bf0dea07c549a0e2'
        let expectAddress = '0xf17ad5dad9293523d6d99a14add6cec43f943603'
        let actualAddress = _buildJulSwap(cakeAddress, ePycAddress)

        assert.strictEqual(actualAddress, expectAddress)
    })

    it('Different address position return the same result', () => {
        let cakeAddress = '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82'
        let ePycAddress = '0x322895d51479e5de68cc3492bf0dea07c549a0e2'
        let expectAddress = '0xf17ad5dad9293523d6d99a14add6cec43f943603'
        let actualAddress1 = _buildJulSwap(cakeAddress, ePycAddress)
        let actualAddress2 = _buildJulSwap(ePycAddress, cakeAddress)

        assert.strictEqual(actualAddress1, actualAddress2)
        assert.strictEqual(actualAddress1, expectAddress)
    })
})
