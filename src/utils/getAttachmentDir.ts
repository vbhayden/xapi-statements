export interface GetAttachementDirOptions {
  subFolder: string;
  lrs_id: string;
}

export default (opts: GetAttachementDirOptions) => `${opts.subFolder}/${opts.lrs_id}/attachments`;
