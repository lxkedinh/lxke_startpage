export type NotionTask = {
  url: string;
  date: TaskDateProperty;
  class: TaskClassProperty;
  type: TaskTypeProperty;
  title: TaskTitleProperty;
};

export type TaskDateProperty =
  | {
      datetime: string;
      id: string;
    }
  | undefined;

export type TaskClassProperty =
  | {
      id: string;
      name: string;
    }
  | undefined;

export type TaskTypeProperty = TaskClassProperty;

export type TaskTitleProperty = string | undefined;
