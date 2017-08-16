"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var sourceMapSupport = require("source-map-support");
sourceMapSupport.install();
require("mocha");
var assert = require("assert");
var stream_1 = require("stream");
var lodash_1 = require("lodash");
var streamToString = require("stream-to-string");
var assertError_1 = require("jscommons/dist/tests/utils/assertError");
var DataBeforeFirstBoundary_1 = require("../../errors/DataBeforeFirstBoundary");
var DataBeyondFinalBoundary_1 = require("../../errors/DataBeyondFinalBoundary");
var getParts_1 = require("../utils/getParts");
var TEST_BOUNDARY = 'test_boundary';
var TEST_CONTENT = 'test_content';
var TEST_HEADERS = {
    'content-type': 'application/json',
};
var crlf = '\r\n';
var TEST_PART_BOUNDARY = crlf + "--" + TEST_BOUNDARY;
var TEST_PART = {
    content: TEST_CONTENT,
    headers: TEST_HEADERS,
};
var partToTestPart = function (part) { return __awaiter(_this, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = {};
                return [4 /*yield*/, streamToString(part.stream)];
            case 1: return [2 /*return*/, (_a.content = _b.sent(),
                    _a.headers = part.headers,
                    _a)];
        }
    });
}); };
var getTestParts = function (stream, boundary) { return __awaiter(_this, void 0, void 0, function () {
    var actualParts, testPartsPromises, testParts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getParts_1.default(stream, boundary)];
            case 1:
                actualParts = _a.sent();
                testPartsPromises = actualParts.map(partToTestPart);
                return [4 /*yield*/, Promise.all(testPartsPromises)];
            case 2:
                testParts = _a.sent();
                return [2 /*return*/, testParts];
        }
    });
}); };
var headersToString = function (headers) {
    var headerStrings = lodash_1.map(headers, function (headerValue, headerKey) {
        return headerKey + ":" + headerValue;
    });
    return headerStrings.join(crlf);
};
describe('expressPresenter/utils/getParts', function () {
    it('should return no parts when there are no parts.', function () { return __awaiter(_this, void 0, void 0, function () {
        var stream, actualParts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    stream = new stream_1.Readable();
                    stream.push(null);
                    return [4 /*yield*/, getTestParts(stream, TEST_BOUNDARY)];
                case 1:
                    actualParts = _a.sent();
                    assert.deepEqual(actualParts, []);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return one part when there is one part without headers in one chunk', function () { return __awaiter(_this, void 0, void 0, function () {
        var headers, testHeaders, testContent, stream, actualParts, expectedParts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    headers = {};
                    testHeaders = "" + crlf;
                    testContent = "" + crlf + crlf + TEST_CONTENT;
                    stream = new stream_1.Readable();
                    stream.push("" + TEST_PART_BOUNDARY + testHeaders + testContent + TEST_PART_BOUNDARY + "--");
                    stream.push(null);
                    return [4 /*yield*/, getTestParts(stream, TEST_BOUNDARY)];
                case 1:
                    actualParts = _a.sent();
                    expectedParts = [{ content: TEST_CONTENT, headers: headers }];
                    assert.deepEqual(actualParts, expectedParts);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return one part when there is one part without content in one chunk', function () { return __awaiter(_this, void 0, void 0, function () {
        var testHeaders, stream, actualParts, expectedParts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testHeaders = "" + crlf + headersToString(TEST_HEADERS);
                    stream = new stream_1.Readable();
                    stream.push("" + TEST_PART_BOUNDARY + testHeaders + TEST_PART_BOUNDARY + "--");
                    stream.push(null);
                    return [4 /*yield*/, getTestParts(stream, TEST_BOUNDARY)];
                case 1:
                    actualParts = _a.sent();
                    expectedParts = [{ content: '', headers: TEST_HEADERS }];
                    assert.deepEqual(actualParts, expectedParts);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return one part when there is one part with headers in one chunk', function () { return __awaiter(_this, void 0, void 0, function () {
        var testHeaders, testContent, stream, actualParts, expectedParts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testHeaders = "" + crlf + headersToString(TEST_HEADERS);
                    testContent = "" + crlf + crlf + TEST_CONTENT;
                    stream = new stream_1.Readable();
                    stream.push("" + TEST_PART_BOUNDARY + testHeaders + testContent + TEST_PART_BOUNDARY + "--");
                    stream.push(null);
                    return [4 /*yield*/, getTestParts(stream, TEST_BOUNDARY)];
                case 1:
                    actualParts = _a.sent();
                    expectedParts = [TEST_PART];
                    assert.deepEqual(actualParts, expectedParts);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return one part when the start of the header boundary is across two chunks', function () { return __awaiter(_this, void 0, void 0, function () {
        var testHeaders, stream, actualParts, expectedParts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testHeaders = headersToString(TEST_HEADERS);
                    stream = new stream_1.Readable();
                    stream.push(TEST_PART_BOUNDARY + "\r\n" + testHeaders + "\r");
                    stream.push("\n\r\n" + TEST_CONTENT + TEST_PART_BOUNDARY + "--");
                    stream.push(null);
                    return [4 /*yield*/, getTestParts(stream, TEST_BOUNDARY)];
                case 1:
                    actualParts = _a.sent();
                    expectedParts = [TEST_PART];
                    assert.deepEqual(actualParts, expectedParts);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return one part when the end of the header boundary is across two chunks', function () { return __awaiter(_this, void 0, void 0, function () {
        var testHeaders, stream, actualParts, expectedParts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testHeaders = headersToString(TEST_HEADERS);
                    stream = new stream_1.Readable();
                    stream.push(TEST_PART_BOUNDARY + "\r\n" + testHeaders + "\r\n\r");
                    stream.push("\n" + TEST_CONTENT + TEST_PART_BOUNDARY + "--");
                    stream.push(null);
                    return [4 /*yield*/, getTestParts(stream, TEST_BOUNDARY)];
                case 1:
                    actualParts = _a.sent();
                    expectedParts = [TEST_PART];
                    assert.deepEqual(actualParts, expectedParts);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return two parts when the start of the part boundary is across two chunks', function () { return __awaiter(_this, void 0, void 0, function () {
        var testHeaders, testContent, stream, startOfPartBoundary, restOfPartBoundary, actualParts, expectedParts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testHeaders = "" + crlf + headersToString(TEST_HEADERS);
                    testContent = "" + crlf + crlf + TEST_CONTENT;
                    stream = new stream_1.Readable();
                    startOfPartBoundary = TEST_PART_BOUNDARY.slice(0, 1);
                    restOfPartBoundary = TEST_PART_BOUNDARY.slice(1);
                    stream.push("" + TEST_PART_BOUNDARY + testHeaders + testContent + startOfPartBoundary);
                    stream.push("" + restOfPartBoundary + testHeaders + testContent + TEST_PART_BOUNDARY + "--");
                    stream.push(null);
                    return [4 /*yield*/, getTestParts(stream, TEST_BOUNDARY)];
                case 1:
                    actualParts = _a.sent();
                    expectedParts = [TEST_PART, TEST_PART];
                    assert.deepEqual(actualParts, expectedParts);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return two parts when the end of the part boundary is across two chunks', function () { return __awaiter(_this, void 0, void 0, function () {
        var testHeaders, testContent, stream, endOfPartBoundary, restOfPartBoundary, actualParts, expectedParts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testHeaders = "" + crlf + headersToString(TEST_HEADERS);
                    testContent = "" + crlf + crlf + TEST_CONTENT;
                    stream = new stream_1.Readable();
                    endOfPartBoundary = TEST_PART_BOUNDARY.slice(-1);
                    restOfPartBoundary = TEST_PART_BOUNDARY.slice(0, -1);
                    stream.push("" + TEST_PART_BOUNDARY + testHeaders + testContent + restOfPartBoundary);
                    stream.push("" + endOfPartBoundary + testHeaders + testContent + TEST_PART_BOUNDARY + "--");
                    stream.push(null);
                    return [4 /*yield*/, getTestParts(stream, TEST_BOUNDARY)];
                case 1:
                    actualParts = _a.sent();
                    expectedParts = [TEST_PART, TEST_PART];
                    assert.deepEqual(actualParts, expectedParts);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return headers when the header separator is in the first chunk', function () { return __awaiter(_this, void 0, void 0, function () {
        var testContent, stream, actualParts, expectedParts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testContent = "" + crlf + crlf + TEST_CONTENT;
                    stream = new stream_1.Readable();
                    stream.push("" + TEST_PART_BOUNDARY + crlf + "Content-Type:");
                    stream.push("application/json" + testContent + TEST_PART_BOUNDARY + "--");
                    stream.push(null);
                    return [4 /*yield*/, getTestParts(stream, TEST_BOUNDARY)];
                case 1:
                    actualParts = _a.sent();
                    expectedParts = [TEST_PART];
                    assert.deepEqual(actualParts, expectedParts);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return headers when the header separator is in the second chunk', function () { return __awaiter(_this, void 0, void 0, function () {
        var testContent, stream, actualParts, expectedParts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testContent = "" + crlf + crlf + TEST_CONTENT;
                    stream = new stream_1.Readable();
                    stream.push("" + TEST_PART_BOUNDARY + crlf + "Content-Type");
                    stream.push(":application/json" + testContent + TEST_PART_BOUNDARY + "--");
                    stream.push(null);
                    return [4 /*yield*/, getTestParts(stream, TEST_BOUNDARY)];
                case 1:
                    actualParts = _a.sent();
                    expectedParts = [TEST_PART];
                    assert.deepEqual(actualParts, expectedParts);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should throw error when there is content before the first boundary', function () { return __awaiter(_this, void 0, void 0, function () {
        var testContent, stream, promise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testContent = "" + crlf + crlf + TEST_CONTENT;
                    stream = new stream_1.Readable();
                    stream.push("invalid_content" + TEST_PART_BOUNDARY + crlf + "Content-Type");
                    stream.push(":application/json" + testContent + TEST_PART_BOUNDARY + "--");
                    stream.push(null);
                    promise = getTestParts(stream, TEST_BOUNDARY);
                    return [4 /*yield*/, assertError_1.default(DataBeforeFirstBoundary_1.default, promise)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should throw error when there is content after the final boundary', function () { return __awaiter(_this, void 0, void 0, function () {
        var testContent, stream, promise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testContent = "" + crlf + crlf + TEST_CONTENT;
                    stream = new stream_1.Readable();
                    stream.push("" + TEST_PART_BOUNDARY + crlf + "Content-Type");
                    stream.push(":application/json" + testContent + TEST_PART_BOUNDARY + "--invalid_content");
                    stream.push(null);
                    promise = getTestParts(stream, TEST_BOUNDARY);
                    return [4 /*yield*/, assertError_1.default(DataBeyondFinalBoundary_1.default, promise)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should throw error when there is an error in the stream', function () { return __awaiter(_this, void 0, void 0, function () {
        var stream, error, promise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    stream = new stream_1.Readable();
                    error = new Error();
                    try {
                        stream.emit('error', error);
                    }
                    catch (err) { }
                    promise = getTestParts(stream, TEST_BOUNDARY);
                    return [4 /*yield*/, assertError_1.default(Error, promise)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=getParts.test.js.map