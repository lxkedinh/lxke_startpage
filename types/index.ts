import { NextApiRequest } from "next";
import { TodoTask } from "./notion-api";

type CalendarCompleteSuccessResponse = {
  status: "success";
  data: null;
};

type TodoFetchSuccessResponse = {
  status: "success";
  data: {
    todos: TodoTask[];
  };
};

type TodoCompleteSuccessResponse = {
  status: "success";
  data: null;
};

interface ErrorResponse {
  status: "error";
  name: string;
  code?: string;
  message: string;
}

export type CalendarCompleteResponse =
  | CalendarCompleteSuccessResponse
  | ErrorResponse;

export type TodoFetchResponse = TodoFetchSuccessResponse | ErrorResponse;

export type TodoCompleteResponse = TodoCompleteSuccessResponse | ErrorResponse;

export interface CalendarCompleteRequest extends NextApiRequest {
  body: {
    pageId: string;
  };
}

export interface TodoCompleteRequest extends NextApiRequest {
  body: {
    blockId: string;
  };
}
