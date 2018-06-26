import { ObjectID } from 'mongodb';
export interface MatchFullActivityOptions {
    readonly activityId: string;
    readonly lrsId: ObjectID;
    readonly organisationId: ObjectID;
}
declare const _default: (opts: MatchFullActivityOptions) => {
    organisation: ObjectID;
    lrs_id: ObjectID;
    activityId: string;
};
export default _default;
