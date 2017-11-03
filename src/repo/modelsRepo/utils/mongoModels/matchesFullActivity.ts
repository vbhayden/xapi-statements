export interface MatchFullActivityOptions {
  readonly activityId: string;
  readonly lrsId: string;
  readonly organisationId: string;
}

export default (opts: MatchFullActivityOptions) => {
  return {
    organisationId: opts.organisationId,
    lrsId: opts.lrsId,
    id: opts.activityId,
  };
};
