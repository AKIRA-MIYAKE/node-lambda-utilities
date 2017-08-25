/// <reference types="sinon" />
import { Context, CognitoIdentity } from 'aws-lambda';
import * as sinon from 'sinon';
export declare const generateDummyContext: () => Context;
export declare const generateMockContext: (paras?: GenerateMockContext.Params) => {
    expectations: sinon.SinonMock;
    context: Context;
};
export declare namespace GenerateMockContext {
    interface Params {
        callbackWaitsForEmptyEventLoop?: boolean;
        functionName?: string;
        functionVersion?: string;
        invokedFunctionArn?: string;
        memoryLimitInMB?: number;
        awsRequestId?: string;
        logGroupName?: string;
        logStreamName?: string;
        identity?: CognitoIdentity;
        getRemainingTimeInMillis?: () => number;
    }
}
