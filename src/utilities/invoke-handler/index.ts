import { Handler, Context, Callback } from 'aws-lambda'

import { generateDummyContext } from '../context'

export const invokeHandler: (handler: Handler, params: InvokeHandler.Params) => void
= (handler, params) => {
  const event = params.event
  const context = (typeof params.context !== 'undefined') ? params.context : generateDummyContext()
  const callback = (typeof params.callback !== 'undefined') ? params.callback : () => {}

  handler(event, context, callback)
}

export namespace InvokeHandler {
  export interface Params {
    event: any
    context?: Context
    callback?: Callback
  }
}
