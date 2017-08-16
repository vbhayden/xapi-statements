import Service from '../../serviceFactory/Service';
export declare type AttachmentAsserter = (expectedIds: string[], expectedAttachments: any[]) => Promise<void>;
export declare type StatementCreator = (attachments: any[], id?: string) => any;
declare const _default: (service: Service, assertAttachments: AttachmentAsserter, createStatement: StatementCreator) => void;
export default _default;
