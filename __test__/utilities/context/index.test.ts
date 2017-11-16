import { generateMockContext } from '../../../src/utilities/context'

describe('utilities/context', () => {

  describe('generateMockContext()', () => {

    describe('returned mock context.', () => {

      it('has correct properties.', () => {
        const context = generateMockContext()

        expect(context.callbackWaitsForEmptyEventLoop).toBe(false)
        expect(context.functionName).toBeDefined()
        expect(context.functionVersion).toBeDefined()
        expect(context.invokedFunctionArn).toBeDefined()
        expect(context.memoryLimitInMB).toBeDefined()
        expect(context.logGroupName).toBeDefined()
        expect(context.identity).toBeUndefined()
        expect(context.clientContext).toBeUndefined()
        expect(context.getRemainingTimeInMillis()).toBe(42)
        expect(context.done).toBeDefined()
        expect(context.fail).toBeDefined()
        expect(context.succeed).toBeDefined()
      })

      it('behave like sinon mock.', () => {
        const context = generateMockContext()
        context.done.once().withArgs(undefined, 'done')
        context.fail.once()
        context.succeed.once().withArgs('succeed')

        context.done(undefined, 'done')
        context.fail(new Error('fail'))
        context.succeed('succeed')

        expect(context.done.verify()).toBe(true)
        expect(context.fail.verify()).toBe(true)
        expect(context.succeed.verify()).toBe(true)
      })

    })

    describe('returned mock context when passed params.', () => {

      it('passed function called when invoke.', () => {
        const context = generateMockContext({
          done: (error: any, result: any) => {
            expect(error).toBeUndefined()
            expect(result).toBe('done')

            context.done.once()

            expect(context.done.verify()).toBe(true)
          }
        })

        context.done(undefined, 'done')
      })

      it('passed async function called when invoke.', () => {
        return new Promise((resolve, reject) => {
          const context = generateMockContext({
            done: (error: any, result: any) => {
              setTimeout(() => {
                context.done.once()
                expect(error).toBeUndefined()
                expect(result).toBe('done')

                expect(context.done.verify()).toBe(true)

                resolve()
              }, 100)
            }
          })

          context.done(undefined, 'done')
        })
      })

    })

  })

})
