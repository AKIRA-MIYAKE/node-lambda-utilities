import { Context, CognitoIdentity } from 'aws-lambda'
import { SinonExpectation, expectation } from 'sinon'

export interface MockContext extends Context {
  done: SinonExpectation
  fail: SinonExpectation
  succeed: SinonExpectation
}

export const generateDummyContext: () => Context = () => ({
  callbackWaitsForEmptyEventLoop: false,
  functionName: 'functionName',
  functionVersion: '0.0',
  invokedFunctionArn: 'invokedFunctionArn',
  memoryLimitInMB: 512,
  awsRequestId: 'awsRequestId',
  logGroupName: 'logGroupName',
  logStreamName: 'logStreamName',
  identity: undefined,
  clientContext: undefined,

  getRemainingTimeInMillis: () => 42,

  done: (error: any, result: any) => {},
  fail: (arg0: any) => {},
  succeed: (arg0: any, arg1?: any) => {}
})

export const generateMockContext: (paras?: GenerateMockContext.Params) => MockContext
= (params = {}) => {
  const context = Object.assign({}, generateDummyContext(), params) as Context

  const done = expectation.create('done')
  done.callsFake(context.done)

  const fail = expectation.create('fail')
  fail.callsFake(context.fail)

  const succeed = expectation.create('succeed')
  succeed.callsFake(context.succeed)

  return Object.assign(context, { done, fail, succeed })
}

export namespace GenerateMockContext {
  export interface Params {
    callbackWaitsForEmptyEventLoop?: boolean
    functionName?: string
    functionVersion?: string
    invokedFunctionArn?: string
    memoryLimitInMB?: number
    awsRequestId?: string
    logGroupName?: string
    logStreamName?: string,
    identity?: CognitoIdentity,

    getRemainingTimeInMillis?: () => number

    done?: (error: any, result: any) => void,
    fail?: (arg0: any) => void,
    succeed?: (arg0: any, arg1?: any) => void
  }
}
