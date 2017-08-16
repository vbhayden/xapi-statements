"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var modr = require("../../utils/modr");
var wrapObjectInArray = modr.modifyType(Object, function (data) {
    return [data];
});
var modifyContext = modr.modifySchema({
    contextActivities: modr.modifySchema({
        parent: wrapObjectInArray,
        grouping: wrapObjectInArray,
        category: wrapObjectInArray,
        other: wrapObjectInArray,
    }),
});
var modifySubStatement = modr.modifySchema({
    context: modifyContext,
});
exports.default = function (models) {
    return models.map(function (model) {
        var setup = modr.modifySchema({
            context: modifyContext,
            object: modr.modifyType(Object, function (data) {
                return (data.objectType === 'SubStatement'
                    ? modifySubStatement(data)
                    : data);
            })
        });
        var setupModel = setup(model);
        return setupModel;
    });
};
//# sourceMappingURL=preValidationSetup.js.map