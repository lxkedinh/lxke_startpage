import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { CalendarPageObjectResponse } from "../types/notion-api";

export function isCalendarPage(
  page: PageObjectResponse
): page is CalendarPageObjectResponse {
  const properties = page.properties;
  for (const [key, value] of Object.entries(properties)) {
    console.log(key, "=>", value);

    // TODO: finish implementing notion page properties type guard check
    switch (key) {
      case "Date":
        if (properties.Date === null) break;
      case "Title":
        break;
      case "Type":
        break;
      case "Class":
        break;
      case "Status":
        break;
      default:
        return false;
    }
  }

  return (
    // non-null notion task due datetime
    taskDate !== null &&
    typeof taskDate === "object" &&
    taskDate.type === "date" &&
    taskDate.date !== null &&
    typeof taskDate.date === "object" &&
    taskDate.date.start !== null &&
    typeof taskDate.date.start === "string" &&
    // non-null notion task title
    taskTitle !== null &&
    typeof taskTitle === "object" &&
    taskTitle.type === "title" &&
    taskTitle.title !== null &&
    Array.isArray(taskTitle.title) &&
    taskTitle.title[0] !== null &&
    typeof taskTitle.title[0] === "object" &&
    taskTitle.title[0].plain_text !== null &&
    typeof taskTitle.title[0].plain_text === "string" &&
    // non-null notion task type (personal, school, work, specific class)
    taskType !== null &&
    typeof taskType === "object" &&
    taskType.type === "select" &&
    taskType.select !== null &&
    typeof taskType.select === "object" &&
    taskType.select.name !== null &&
    typeof taskType.select.name === "string" &&
    // indicate the specific university class this task is for,
    // the property itself can't be null but its value
    // can be null for personal/work tasks
    taskClass !== null &&
    typeof taskClass === "object" &&
    taskClass.type === "select" &&
    // notion task status (incomplete or done)
    taskStatus !== null &&
    typeof taskStatus === "object" &&
    taskStatus.type === "select" &&
    taskStatus.select !== null &&
    typeof taskStatus.select === "object" &&
    taskStatus.select.name !== null
  );
}
