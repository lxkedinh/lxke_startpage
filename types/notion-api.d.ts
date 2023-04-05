export type NotionTask = {
  id: string;
  url: string;
  dateISO: string;
  taskClass: TaskClassProperty;
  taskType: TaskTypeProperty;
  title: TaskTitleProperty;
};

// TODO: create type for Notion page.properties object to make sure fetched
// pages are from my calendar
