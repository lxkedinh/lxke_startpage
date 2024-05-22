import { NextApiRequest, NextApiResponse } from "next";
import { isTodoCompleteRequest, notion } from "../../../util/notion-api";
import { TodoCompleteResponse } from "../../../types";
import { isNotionClientError } from "@notionhq/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TodoCompleteResponse>
) {
  try {
    if (!isTodoCompleteRequest(req)) {
      throw new Error("Notion block ID was not given or was not a string.");
    }

    await notion.blocks.update({
      block_id: req.body.blockId,
      to_do: {
        checked: true,
      },
    });

    return res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err: unknown) {
    if (isNotionClientError(err)) {
      return res.status(400).json({
        status: "error",
        name: err.name,
        message: err.message,
        code: err.code,
      });
    } else if (err instanceof Error) {
      return res.status(400).json({
        status: "error",
        name: err.name,
        message: err.message,
      });
    }

    return res.status(500).json({
      status: "error",
      name: "UnknownError",
      message: "Unknown error occurred.",
    });
  }
}
