"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var pickDefined_1 = require("../pickDefined");
var encodeOpt = function (opt) {
    return opt !== undefined ? encodeURIComponent(opt.toString()) : undefined;
};
exports.default = (function (opts) {
    if (opts.results.cursor === undefined) {
        return '';
    }
    var moreLinkOpts = pickDefined_1.default({
        agent: (opts.statementsOpts.agent !== undefined
            ? encodeURIComponent(JSON.stringify(opts.statementsOpts.agent))
            : undefined),
        activity: encodeOpt(opts.statementsOpts.activity),
        verb: encodeOpt(opts.statementsOpts.verb),
        related_agents: opts.statementsOpts.related_agents,
        related_activities: opts.statementsOpts.related_activities,
        registration: opts.statementsOpts.registration,
        since: opts.statementsOpts.since,
        until: opts.statementsOpts.until,
        ascending: opts.statementsOpts.ascending,
        limit: opts.statementsOpts.limit,
        skip: opts.statementsOpts.skip,
        format: opts.resultOpts.format,
        attachments: opts.resultOpts.attachments,
        langs: opts.resultOpts.langs,
        cursor: opts.results.cursor,
    });
    var moreLinkParams = lodash_1.map(moreLinkOpts, function (value, key) {
        return value === undefined ? '' : key + "=" + value;
    }).filter(function (param) {
        return param !== '';
    }).join('&');
    return opts.urlPath + "?" + moreLinkParams;
});
//# sourceMappingURL=getMoreLink.js.map