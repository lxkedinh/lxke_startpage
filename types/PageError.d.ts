import { PageErrorCode } from "../util/PageError";

declare class PageError extends Error {
  readonly code: PageErrorCode;

  constructor(code: PageErrorCode);
}
