"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var removeDuplications = function (elements, mapper, uniqueElements, existingValues) {
    if (elements.length === 0)
        return uniqueElements;
    var element = elements[0], nextElements = elements.slice(1);
    var value = mapper(element);
    var isUniqueValue = existingValues.indexOf(value) === -1;
    var nextUniqueElements = isUniqueValue ? uniqueElements.concat([element]) : uniqueElements;
    var nextExistingValues = isUniqueValue ? existingValues.concat([value]) : existingValues;
    return removeDuplications(nextElements, mapper, nextUniqueElements, nextExistingValues);
};
exports.default = (function (arr, mapper) {
    return removeDuplications(arr, mapper, [], []);
});
//# sourceMappingURL=removeDuplicates.js.map