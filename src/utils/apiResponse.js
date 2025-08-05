export class ApiResponse {
  constructor(statusCode, message, data = {}) {
    this.statusCode = statusCode;
    this.message = message;
    this.success = true;
    // this.success = statusCode < 400;

    if (data) {
      this.data = data;
    }
  }
}
