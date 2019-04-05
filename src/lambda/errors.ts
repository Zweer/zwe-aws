export class ErrorWithStatus extends Error {
  constructor(readonly statusCode: number, message?: string) {
    super(message);
  }

  toJSON() {
    return {
      message: this.message,
    };
  }
}

export class ErrorWithStatus404 extends ErrorWithStatus {
  constructor(message?: string) { super(404, message); }
}
