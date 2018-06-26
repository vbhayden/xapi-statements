"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataBeforeFirstBoundary_1 = require("../../../errors/DataBeforeFirstBoundary");
var DataBeyondFinalBoundary_1 = require("../../../errors/DataBeyondFinalBoundary");
exports.default = (function (data, boundary) {
    var partBoundary = new RegExp("\\r?\\n?--" + boundary);
    var dataParts = data.split(partBoundary);
    if (dataParts.length > 0 && dataParts[0] !== '') {
        throw new DataBeforeFirstBoundary_1.default();
    }
    if (dataParts.length > 1 && dataParts[dataParts.length - 1] !== '--') {
        throw new DataBeyondFinalBoundary_1.default();
    }
    return dataParts.slice(1, -1);
});
//# sourceMappingURL=getStreamParts.js.map