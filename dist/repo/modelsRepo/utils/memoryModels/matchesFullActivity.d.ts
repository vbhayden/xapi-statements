import FullActivityModel from '../../../../models/FullActivityModel';
export interface MatchFullActivityOptions {
    readonly activityId: string;
    readonly lrsId: string;
    readonly model: FullActivityModel;
    readonly organisationId: string;
}
declare const _default: (opts: MatchFullActivityOptions) => boolean;
export default _default;
