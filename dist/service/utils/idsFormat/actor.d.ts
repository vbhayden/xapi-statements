import Agent from '../../../models/Agent';
import Group from '../../../models/Group';
import IdFormattedActor from '../../../models/IdFormattedActor';
export interface ActorWithId {
    account?: any;
    mbox?: any;
    mbox_sha1sum?: any;
    openid?: any;
}
export interface ActorWithMembers {
    member?: any[];
}
declare const formatActor: (actor: Agent | Group) => IdFormattedActor;
export default formatActor;
