export class OperationError extends Error {
  constructor(message: string = "Operation error") {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
  }
}