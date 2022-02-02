// TypeScript type declarations
declare type TaskList = Task[];
declare type Labels = Label[];

declare interface TodoistProps {
  taskListProps: TaskList | TodoistError;
  labelsProps: Labels | TodoistError;
}

declare interface globalProps extends TodoistProps {
  errorProp: boolean;
}
