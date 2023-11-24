import { UpdatePageResponse } from "@notionhq/client/build/src/api-endpoints";
import { NextApiRequest } from "next";

type CalendarCompleteSuccessResponse = {
  status: "success";
  data: null;
};

type TodoCompleteSuccessResponse = {
  status: "success";
  data: null
}

type ErrorResponse = {
  status: "error";
  message: string;
};

export type CalendarCompleteResponse =
  | CalendarCompleteSuccessResponse
  | ErrorResponse;

export type TodoCompleteResponse = 
  | TodoCompleteSuccessResponse
  | ErrorResponse;

export interface CalendarCompleteRequest extends NextApiRequest {
  body: {
    pageId: string;
  };
}

export interface TodoCompleteRequest extends NextApiRequest {
  body: {
    blockId: string;
  }
}
