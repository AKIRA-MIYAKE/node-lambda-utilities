/// <reference types="sinon" />
import { Callback } from 'aws-lambda';
import * as sinon from 'sinon';
export declare const generateMockCallback: (callback?: Callback) => {
    expectation: sinon.SinonExpectation;
    callback: Callback;
};
