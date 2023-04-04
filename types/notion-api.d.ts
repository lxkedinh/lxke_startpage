export type NotionTask = {
    id: string;
    url: string;
    dateISO: string;
    taskClass: TaskClassProperty;
    taskType: TaskTypeProperty;
    title: TaskTitleProperty;
};

export type TaskClassProperty =
    | {
        id: string;
        name: string;
    }
    | undefined;

export type TaskTypeProperty = TaskClassProperty;

export type TaskTitleProperty = string | undefined;
