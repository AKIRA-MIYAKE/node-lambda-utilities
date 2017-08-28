"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sinon = require("sinon");
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
    var expectations = sinon.mock(context);
    return { expectations: expectations, context: context };
};
