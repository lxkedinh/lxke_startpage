import { NextApiRequest, NextApiResponse } from "next";
import { isTodoListBlock, notion } from "../../../util/notion-api";
import { TodoTask } from "../../../types/notion-api";
import { isFullBlock } from "@notionhq/client";
import { TodoFetchResponse } from "../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TodoFetchResponse>
) {
  try {
    const blocksResponse = await notion.blocks.children.list({
      block_id: process.env.NOTION_TODO_BLOCK_ID!,
    });

    const todoList: TodoTask[] = [];
    for (const block of blocksResponse.results) {
      if (
        !isFullBlock(block) ||
        !isTodoListBlock(block) ||
        block.to_do.rich_text.length !== 1 ||
        block.to_do.checked === true
      ) {
        continue;
      }

      todoList.push({
        blockId: block.id,
        text: block.to_do.rich_text[0].plain_text,
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        todos: todoList,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      name: "UnknownError",
      message: "Unknown error occurred.",
    });
  }
}
