import { UpdatePageResponse } from "@notionhq/client/build/src/api-endpoints";
import { NextApiRequest } from "next";

export type TaskCompleteSuccessResponse = {
  status: "success";
  data: {
    page: UpdatePageResponse;
  };
};

export type TaskCompleteFailResponse = {
  status: "error";
  message: string;
};

export type TaskCompleteResponse =
  | TaskCompleteSuccessResponse
  | TaskCompleteFailResponse;

export interface CompleteTaskRequest extends NextApiRequest {
  body: {
    pageId: string;
  };
}
