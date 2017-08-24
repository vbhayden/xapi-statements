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
var createAttachment_1 = require("../utils/createAttachment");
var createAttachmentModel_1 = require("../utils/createAttachmentModel");
var storeStatementsInService_1 = require("../utils/storeStatementsInService");
var TEST_ID_1 = '1c86d8e9-f325-404f-b3d9-24c451035582';
var TEST_ID_2 = '1c86d8e9-f325-404f-b3d9-24c451035583';
var TEST_CONTENT_A = 'A';
var TEST_ATTACHMENT_A = createAttachment_1.default(TEST_CONTENT_A);
var TEST_FILE_URL_ATTACHMENT = createAttachment_1.default(TEST_CONTENT_A, 'http://www.example.com');
exports.default = function (service, assertAttachments, createStatement) {
    var storeStatements = storeStatementsInService_1.default(service);
    it('should return an attachment when it is referenced once', function () { return __awaiter(_this, void 0, void 0, function () {
        var testAttachmentModelA, testStatement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testAttachmentModelA = createAttachmentModel_1.default(TEST_CONTENT_A);
                    testStatement = createStatement([TEST_ATTACHMENT_A], TEST_ID_1);
                    return [4 /*yield*/, storeStatements([testStatement], [testAttachmentModelA])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, assertAttachments([TEST_ID_1], [testAttachmentModelA])];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not return an attachment when it is referenced via a fileURL', function () { return __awaiter(_this, void 0, void 0, function () {
        var testStatement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testStatement = createStatement([TEST_FILE_URL_ATTACHMENT], TEST_ID_1);
                    return [4 /*yield*/, storeStatements([testStatement], [])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, assertAttachments([TEST_ID_1], [])];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return an attachment once when it is attached twice', function () { return __awaiter(_this, void 0, void 0, function () {
        var testAttachmentModelA, testStatement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testAttachmentModelA = createAttachmentModel_1.default(TEST_CONTENT_A);
                    testStatement = createStatement([TEST_ATTACHMENT_A], TEST_ID_1);
                    return [4 /*yield*/, storeStatements([testStatement], [testAttachmentModelA, testAttachmentModelA])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, assertAttachments([TEST_ID_1], [testAttachmentModelA])];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return an attachment once when it is referenced twice and attached once', function () { return __awaiter(_this, void 0, void 0, function () {
        var testAttachmentModelA, testStatement1, testStatement2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testAttachmentModelA = createAttachmentModel_1.default(TEST_CONTENT_A);
                    testStatement1 = createStatement([TEST_ATTACHMENT_A], TEST_ID_1);
                    testStatement2 = createStatement([TEST_ATTACHMENT_A], TEST_ID_2);
                    return [4 /*yield*/, storeStatements([testStatement1, testStatement2], [testAttachmentModelA])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, assertAttachments([TEST_ID_2, TEST_ID_1], [testAttachmentModelA])];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return an attachment once when it is referenced twice in one statement', function () { return __awaiter(_this, void 0, void 0, function () {
        var testAttachmentModelA, testStatement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testAttachmentModelA = createAttachmentModel_1.default(TEST_CONTENT_A);
                    testStatement = createStatement([TEST_ATTACHMENT_A, TEST_ATTACHMENT_A], TEST_ID_1);
                    return [4 /*yield*/, storeStatements([testStatement], [testAttachmentModelA])];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, assertAttachments([TEST_ID_1], [testAttachmentModelA])];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
};
//# sourceMappingURL=attachmentsTest.js.map