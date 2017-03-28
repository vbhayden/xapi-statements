export default class implements Error {
  public name: string;
  public message: string;
  public stack?: string;

  constructor(message: string) {
    this.message = message;
    this.name = this.constructor.name;
    this.stack = (new Error(message)).stack;
  }
}
