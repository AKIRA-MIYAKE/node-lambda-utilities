import { generateMockCallback } from '../../../src/utilities/callback'

describe('utilities/callback', () => {

  describe('generateMockCallback()', () => {

    describe('returned mock callback.', () => {

      it('behave like sinon mock.', () => {
        const callback = generateMockCallback()
        callback.once().withArgs(undefined, 'result')

        callback(undefined, 'result')

        expect(callback.verify()).toBe(true)
      })

    })

    describe('returned mock callback when passed function.', () => {

      it('passed function called when invoke.', () => {
        const callback = generateMockCallback((error, result) => {
          expect(error).toBeUndefined()
          expect(result).toBe('result')
        })
        callback.once()
        callback(undefined, 'result')

        expect(callback.verify()).toBe(true)
      })

      it('passed async function called when invoke.', () => {
        return new Promise((resolve, reject) => {
          const callback = generateMockCallback((error, result) => {
            setTimeout(() => {
              callback.once()
              expect(error).toBeUndefined()
              expect(result).toBe('result')

              expect(callback.verify()).toBe(true)

              resolve()
            }, 100)
          })

          callback(undefined, 'result')
        })
      })

    })

  })

})
