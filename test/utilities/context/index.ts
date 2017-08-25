import * as assert from 'power-assert'
import { } from 'sinon'

import { generateMockContext } from '../../../src/utilities/context'

describe('utilities/context', () => {

  describe('generateMockContext()', () => {

    it('Should get mock context.', () => {
      const context= generateMockContext()

      assert.equal(context.callbackWaitsForEmptyEventLoop, false)
      assert.ok(context.functionName)
      assert.ok(context.functionVersion)
      assert.ok(context.invokedFunctionArn)
      assert.ok(context.memoryLimitInMB)
      assert.ok(context.logGroupName)
      assert.ok(context.logStreamName)
      assert.equal(context.identity, undefined)
      assert.equal(context.clientContext, undefined)
      assert.ok(context.getRemainingTimeInMillis)
      assert.ok(context.done)
      assert.ok(context.fail)
      assert.ok(context.succeed)
    })

    it('Should context functions call can be confirmed.', () => {
      const context= generateMockContext()
      context.done.once().withArgs(undefined, 'done')
      context.fail.once()
      context.succeed.once().withArgs('succeed')

      context.done(undefined, 'done')
      context.fail(new Error('fail'))
      context.succeed('succeed')

      assert.ok(context.done.verify())
      assert.ok(context.fail.verify())
      assert.ok(context.succeed.verify())
    })

    it('Should context function call can be confirmed, when async process.', done => {
      const context = generateMockContext({
        done: (error: any, result: any) => {
          context.done.once().withArgs(undefined, 'done')
          assert.ok(context.done.verify())
          done()
        }
      })

      setTimeout(() => {
        context.done(undefined, 'done')
      }, 1000)
    })

  })

})
