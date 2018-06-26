declare type ActorCreator = (ifi: any) => any;
declare const _default: (createIdsActor: ActorCreator, createExactActor?: ActorCreator) => (createActorStatement: (actor: any) => any, createIdsActorStatement?: (actor: any) => any) => void;
export default _default;
