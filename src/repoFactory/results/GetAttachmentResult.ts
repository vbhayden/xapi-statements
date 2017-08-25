interface Result {
  readonly stream: NodeJS.ReadableStream;
  readonly contentLength?: number;
}

export default Result;
