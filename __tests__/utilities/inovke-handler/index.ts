import { Handler } from 'aws-lambda'

import { invokeHandler } from '../../../src/utilities/invoke-handler'
import { generateMockContext } from '../../../src/utilities/context'
import { generateMockCallback } from '../../../src/utilities/callback'

describe('utilities/invoke-handler', () => {

  describe('invokeHandler()', () => {

    interface TestEvent { foo: number }
    type TestResult = TestEvent

    it('invoke passed callback.', () => {
      const handler: Handler<TestEvent, TestResult> = (event, context, callback) => {
        callback(undefined, { foo: event.foo * 2 })
      }

      invokeHandler(handler, {
        event: { foo: 21 },
        callback: (error, result) => {
          expect(error).toBeUndefined()
          expect(result).toEqual({ foo: 42 })
        }
      })
    })

    it('invoke passed calback in async handler.', () => {
      return new Promise((resolve, reject) => {
        const handler: Handler<TestEvent, TestResult> = (event, context, callback) => {
          setTimeout(() => {
            callback(undefined, { foo: event.foo * 2})
          }, 100)
        }

        const callback = generateMockCallback((error, result) => {
          callback.once()
          expect(error).toBeUndefined()
          expect(result).toEqual({ foo: 42 })

          expect(callback.verify()).toBe(true)

          resolve()
        })

        invokeHandler(handler, {
          event: { foo: 21 },
          callback: callback
        })
      })

    })

    it('invoke passed context in async handler.', () => {
      return new Promise((resolve, reject) => {
        const handler: Handler<TestEvent, TestResult> = (event, context, callback) => {
          setTimeout(() => {
            context.done(undefined, { foo: event.foo * 2 })
          }, 100)
        }

        const context = generateMockContext({
          done: (error: any, result: any) => {
            context.done.once()
            expect(error).toBeUndefined()
            expect(result).toEqual({ foo: 42 })

            expect(context.done.verify()).toBe(true)

            resolve()
          }
        })

        invokeHandler(handler, {
          event: { foo: 21 },
          context: context
        })
      })
    })

  })

})
