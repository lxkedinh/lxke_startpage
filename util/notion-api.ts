import { BlockObjectResponse, DatabaseObjectResponse, PageObjectResponse, ToDoBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { CalendarPageObjectResponse } from "../types/notion-api";
import { Client } from "@notionhq/client";
import { NextApiRequest } from "next";
import { CalendarCompleteRequest, TodoCompleteRequest } from "../types";

export const notion = new Client({ auth: process.env.NOTION_TOKEN });

export function isCalendarPage(
  page: PageObjectResponse | DatabaseObjectResponse
): page is CalendarPageObjectResponse {
  const properties = page.properties;

  const date = properties.Date;
  if (!date || date.type !== "date" || !date.date || !date.date.start) {
    return false;
  }
  const title = properties.Title;
  if (!title || title.type !== "title" || !title.title || !Array.isArray(title.title) || !title.title[0]) {
    return false;
  }
  const type = properties.Type;
  if (!type || type.type !== "select" || !type.select) {
    return false;
  }
  const taskClass = properties.Class;
  if (!taskClass || taskClass.type !== "select") {
    return false;
  }
  const done = properties.Done;
  if (!done || done.type !== "checkbox" || done.checkbox === null) {
    return false;
  }

  return true;
}

export function isTodoListBlock(
  res: BlockObjectResponse
): res is ToDoBlockObjectResponse {
  if (!res.type || res.type !== "to_do") {
    return false;
  }
  
  return true;
}

export function isCalendarCompleteRequest(
  req: NextApiRequest
): req is CalendarCompleteRequest {
  if (!req.body.pageId || typeof req.body.pageId !== "string") {
    return false;
  }

  return true;
}

export function isTodoCompleteRequest(req: NextApiRequest): req is TodoCompleteRequest {
  if (!req.body.blockId || typeof req.body.blockId !== "string") {
    return false;
  }

  return true;
}
