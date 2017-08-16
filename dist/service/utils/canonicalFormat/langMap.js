"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (langMap, langs) {
    return langs.reduce(function (formattedLangMap, lang) {
        if (langMap[lang] !== undefined) {
            return _a = {}, _a[lang] = langMap[lang], _a;
        }
        return formattedLangMap;
        var _a;
    }, langMap);
};
//# sourceMappingURL=langMap.js.map