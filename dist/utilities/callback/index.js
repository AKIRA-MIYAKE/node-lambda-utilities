"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sinon = require("sinon");
exports.generateMockCallback = function (callback) {
    if (callback === void 0) { callback = function () { }; }
    var expectation = sinon.expectation.create('callback');
    return {
        expectation: expectation,
        callback: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            expectation.apply(undefined, args);
            callback.apply(undefined, args);
        }
    };
};
