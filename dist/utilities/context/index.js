"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sinon_1 = require("sinon");
exports.generateDummyContext = function () { return ({
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
    getRemainingTimeInMillis: function () { return 42; },
    done: function (error, result) { },
    fail: function (arg0) { },
    succeed: function (arg0, arg1) { }
}); };
exports.generateMockContext = function (params) {
    if (params === void 0) { params = {}; }
    var context = Object.assign({}, exports.generateDummyContext(), params);
    var done = sinon_1.expectation.create('done');
    done.callsFake(context.done);
    var fail = sinon_1.expectation.create('fail');
    fail.callsFake(context.fail);
    var succeed = sinon_1.expectation.create('succeed');
    succeed.callsFake(context.succeed);
    return Object.assign(context, { done: done, fail: fail, succeed: succeed });
};
