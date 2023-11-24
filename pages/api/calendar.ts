import { NextApiRequest, NextApiResponse } from "next";
import { isCalendarCompleteRequest, notion } from "../../util/notion-api";
import { CalendarCompleteRequest, CalendarCompleteResponse } from "../../types";

export default async function handler(
  req: CalendarCompleteRequest,
  res: NextApiResponse<CalendarCompleteResponse>
) {
  try {
    if (!isCalendarCompleteRequest(req)) {
      throw new Error("Notion page ID was not given or was not a string.");
    }

    await notion.pages.update({
      page_id: req.body.pageId,
      properties: {
        Done: {
          checkbox: true,
        },
      },
    });

    return res.status(200).json({
      status: "success",
      data: null
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(400).json({
        status: "error",
        message: err.message,
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Unknown error occurred.",
    });
  }
}
