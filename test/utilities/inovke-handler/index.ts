import * as assert from 'power-assert'

import { Handler } from '../../../src/types'

import { invokeHandler } from '../../../src/utilities/invoke-handler'
import { generateMockContext } from '../../../src/utilities/context'
import { generateMockCallback } from '../../../src/utilities/callback'

describe('utilities/callback', () => {

  interface TestEvet { foo: number }
  interface TestCallback {
    (error?: Error, result?: TestEvet): void
  }

  it('Should invoke callback', () => {
    const handler: Handler<TestEvet, TestCallback> = (event, context, callback) => {
      callback(undefined, { foo: event.foo * 2 })
    }

    invokeHandler(handler, {
      event: { foo: 21 },
      callback: (error, result) => {
        assert.equal(result.foo, 42)
      }
    })
  })

  it('Should invoke callback on async handler.', done => {
    const handler: Handler<TestEvet, TestCallback> = (event, context, callback) => {
      setTimeout(() => {
        callback(undefined, { foo: event.foo * 2 })
      }, 1000)
    }

    const callback = generateMockCallback((error, result) => {
      callback.once()
      assert.equal(result.foo, 42)
      assert.ok(callback.verify())
      done()
    })

    invokeHandler(handler, {
      event: { foo: 21 },
      callback: callback
    })
  })

  it('Should invoke callback on async handler when fail.', done => {
    const handler: Handler<TestEvet, TestCallback> = (event, context, callback) => {
      setTimeout(() => {
        callback(new Error('This is a error.'))
      }, 1000)
    }

    const callback = generateMockCallback((error) => {
      callback.once()
      assert.equal(error!.message, 'This is a error.')
      assert.ok(callback.verify())
      done()
    })

    invokeHandler(handler, {
      event: { foo: 21 },
      callback: callback
    })
  })

})
