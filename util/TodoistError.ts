export class TodoistError {
  message: string;
  id: number;
  httpStatusCode?: number;
  responseData?: unknown;

  constructor(
    message: string,
    httpStatusCode: number = 500,
    responseData: unknown = "Todoist servers are currently encountering unknown problems."
  ) {
    this.message = message;
    this.id = 1;
    this.httpStatusCode = httpStatusCode;
    this.responseData = responseData;
  }
}
