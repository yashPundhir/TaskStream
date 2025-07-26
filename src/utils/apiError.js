class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    name = "",
    errors = [],
    stack = "",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;

    if (name) {
      this.name = name;
    }

    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
