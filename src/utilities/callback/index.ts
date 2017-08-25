import { Callback } from 'aws-lambda'
import { SinonExpectation, expectation } from 'sinon'

export interface MockCallback extends Callback, SinonExpectation { }

export const generateMockCallback: (callback?: Callback) => MockCallback
= (callback = () => {}) => {
  const mockCallback = expectation.create('callback')
  mockCallback.callsFake(callback)

  return mockCallback
}
