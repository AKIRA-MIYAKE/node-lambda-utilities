"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sinon_1 = require("sinon");
exports.generateMockCallback = function (callback) {
    if (callback === void 0) { callback = function () { }; }
    var mockCallback = sinon_1.expectation.create('callback');
    mockCallback.callsFake(callback);
    return mockCallback;
};
//# sourceMappingURL=index.js.map