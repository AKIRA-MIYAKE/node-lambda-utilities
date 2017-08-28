import * as assert from 'power-assert'
import { } from 'sinon'

import { generateMockCallback } from '../../../src/utilities/callback'

describe('utilities/callback', () => {

  describe('generateMockCallback()', () => {

    it('Should get mock callback.', () => {
      const callback = generateMockCallback()

      assert.ok(callback)
    })

    it('Should callback functions call can be confirmed.', () => {
      const callback = generateMockCallback()
      callback.once().withArgs(undefined, 'result')

      callback(undefined, 'result')

      assert.ok(callback.verify())
    })

    it('Should get mock function with callback.', () => {
      const callback = generateMockCallback((error, result) => {
        assert.equal(result, 'result')
      })

      callback(undefined, 'result')
    })

    it('Should context functions call can be confirmed when async.', done => {
      const callback = generateMockCallback((error, result) => {
        callback.once().withArgs(undefined, 'result')
        assert.ok(callback.verify())
        done()
      })

      setTimeout(() => {
        callback(undefined, 'result')
      }, 1000)
    })

  })

})
