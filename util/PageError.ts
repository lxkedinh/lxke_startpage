export const enum PageErrorCode {
  NoTasks = "no_tasks",
}

export function isPageError(err: unknown): err is PageError {
  if (err && typeof err === "object") {
    if ("code" in err && typeof (err as PageError).code === "string") {
      switch (err.code) {
        case PageErrorCode.NoTasks:
          return true;
        default:
      }
    }
  }

  return false;
}

export class PageError extends Error {
  readonly code: PageErrorCode;

  constructor(code: PageErrorCode) {
    super();
    this.code = code;
  }
}
