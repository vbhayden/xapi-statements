/// <reference types="node" />
import { Readable as ReadableStream } from 'stream';
import Part from '../../../models/Part';
declare const _default: (stream: ReadableStream, boundary: string) => Promise<Part[]>;
export default _default;
