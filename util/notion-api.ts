import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NotionTask } from "../types/notion-api";

export function isCalendarPage(page: any): page is NotionTask {
  const taskDate = page.properties.Date;

  return (
    typeof taskDate === "object" &&
    taskDate !== null &&
    taskDate.type == "date" &&
    taskDate.date !== null &&
    taskDate.date.start !== null
  );
}
