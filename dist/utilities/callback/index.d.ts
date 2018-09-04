import { Callback } from 'aws-lambda';
import { SinonExpectation } from 'sinon';
export interface MockCallback extends Callback, SinonExpectation {
}
export declare const generateMockCallback: (callback?: Callback) => MockCallback;
