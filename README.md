# lambda-utilities
Utility functions and type definitions for AWS Lambda

## Installation

```
$ npm isntall lambda-utilities
```

## Usage

### Utilities
#### Callback
Provide mock `Callback` that implementing interface of `SinonExpectation`.
The argument `callback` is executed on `callsFake`.

```
generateMockCallback: (callback?: Callback) => MockCallback
```

#### Context
Provide mock `Context`.
`done`, `fail` and `succeed` are implementing interface of `SinonExpectation`.
If you set a function with parameters, it will be executed on `callsFake`.

```
generateMockContext: (params?: GenerateMockContext.Params) => MockContext

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
```

#### InvokeHandler
It is a function that executes the handler of lambda.
It can be used in tests in combination with mock.

```
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
```
