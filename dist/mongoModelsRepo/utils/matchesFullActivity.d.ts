export interface MatchFullActivityOptions {
    readonly activityId: string;
    readonly lrsId: string;
    readonly organisationId: string;
}
declare const _default: (opts: MatchFullActivityOptions) => {
    organisationId: string;
    lrsId: string;
    id: string;
};
export default _default;
