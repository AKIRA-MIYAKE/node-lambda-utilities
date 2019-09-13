import { Handler, Context, Callback } from 'aws-lambda';
export declare const invokeHandler: (handler: Handler, params: InvokeHandler.Params) => void;
export declare namespace InvokeHandler {
    interface Params {
        event: any;
        context?: Context;
        callback?: Callback;
    }
}
//# sourceMappingURL=index.d.ts.map