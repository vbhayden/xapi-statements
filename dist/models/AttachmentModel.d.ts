/// <reference types="node" />
interface AttachmentModel {
    stream: NodeJS.ReadableStream;
    hash: string;
    contentType: string;
}
export default AttachmentModel;
