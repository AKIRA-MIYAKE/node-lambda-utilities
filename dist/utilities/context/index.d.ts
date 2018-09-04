import { Context, CognitoIdentity } from 'aws-lambda';
import { SinonExpectation } from 'sinon';
export interface MockContext extends Context {
    done: SinonExpectation;
    fail: SinonExpectation;
    succeed: SinonExpectation;
}
export declare const generateDummyContext: () => Context;
export declare const generateMockContext: (params?: GenerateMockContext.Params) => MockContext;
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
        done?: (error: any, result: any) => void;
        fail?: (arg0: any) => void;
        succeed?: (arg0: any, arg1?: any) => void;
    }
}
