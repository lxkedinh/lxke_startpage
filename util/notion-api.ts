import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { CalendarPageObjectResponse } from "../types/notion-api";

export function isCalendarPage(
  page: PageObjectResponse
): page is CalendarPageObjectResponse {
  const properties = page.properties;
  for (const [key] of Object.entries(properties)) {
    switch (key) {
      case "Date":
        const date = properties.Date;
        if (!date || date.type !== "date" || !date.date || !date.date.start) {
          return false;
        }
      case "Title":
        const title = properties.Title;
        if (
          !title ||
          title.type !== "title" ||
          !title.title ||
          !title.title[0]
        ) {
          return false;
        }
        break;
      case "Type":
        const type = properties.Type;
        if (!type || type.type !== "select" || !type.select) {
          return false;
        }
        break;
      case "Class":
        const taskClass = properties.Class;
        if (!taskClass || taskClass.type !== "select") {
          return false;
        }
        break;
      case "Status":
        const status = properties.Status;
        if (!status || status.type !== "status" || !status.status) {
          return false;
        }
        break;
      default:
        return false;
    }
  }

  return true;
}
