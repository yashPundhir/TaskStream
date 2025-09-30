class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    name = "",
    stack = "",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;

    this.success = false;
    this.errors = errors;

    if (name) {
      this.name = name;
    }

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
