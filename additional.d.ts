// TypeScript type declarations
declare type TaskList = Task[];
declare type Labels = Label[];

declare interface TodoistProps {
  taskList: TaskList | TodoistError;
  labels: Labels | TodoistError;
}
