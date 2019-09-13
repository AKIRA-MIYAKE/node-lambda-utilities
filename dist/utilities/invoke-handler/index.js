"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var context_1 = require("../context");
exports.invokeHandler = function (handler, params) {
    var event = params.event;
    var context = (typeof params.context !== 'undefined') ? params.context : context_1.generateDummyContext();
    var callback = (typeof params.callback !== 'undefined') ? params.callback : function () { };
    handler(event, context, callback);
};
//# sourceMappingURL=index.js.map