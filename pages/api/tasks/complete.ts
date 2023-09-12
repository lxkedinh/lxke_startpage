import { NextApiRequest, NextApiResponse } from "next";
import { isCompleteTaskRequest, notion } from "../../../util/notion-api";
import { TaskCompleteResponse } from "../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TaskCompleteResponse>
) {
  try {
    if (!isCompleteTaskRequest(req)) {
      throw new Error("Notion page ID was not given or was not a string.");
    }

    const response = await notion.pages.update({
      page_id: req.body.pageId,
      properties: {
        Done: {
          checkbox: true,
        },
      },
    });

    return res.status(200).json({
      status: "success",
      data: {
        page: response,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(403).json({
        status: "error",
        message: err.message,
      });
    }

    return res.status(403).json({
      status: "error",
      message: "Unknown error occurred.",
    });
  }
}
