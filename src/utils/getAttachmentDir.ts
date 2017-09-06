export interface GetAttachementDirOptions {
  subfolder: string;
  lrs_id: string;
}

export default (opts: GetAttachementDirOptions) => `${opts.subfolder}/${opts.lrs_id}/attachments`;
