import { PageErrorCode } from "../util/PageError";

export class PageError extends Error {
  readonly code: PageErrorCode;

  constructor(code: PageErrorCode) {
    super();
    this.code = code;
  }
}
