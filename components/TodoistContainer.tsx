import { StyledTodoistContainer } from "./styles/Container.styled";
import { DayTitle } from "./styles/DayTitle.styled";
import { DayTaskList } from "./styles/DayTaskList.styled";
import { days } from "../util/dateTime";
import DayTask from "./DayTask";
import { TaskList, TaskListProps } from "../additional";

const TodoistContainer = ({ taskList }: TaskListProps) => {
  /**
   * get the next 7 days to display on todo list
   */
  const d = new Date();

  return (
    <StyledTodoistContainer>
      <DayTaskList>
        <DayTitle>{days[d.getDay()]}</DayTitle>
        <ul>{filterTasks(taskList, d.getDay())}</ul>
      </DayTaskList>
      <DayTaskList>
        <DayTitle>{days[(d.getDay() + 1) % 7]}</DayTitle>
        <ul>{filterTasks(taskList, d.getDay() + 1)}</ul>
      </DayTaskList>
      <DayTaskList>
        <DayTitle>{days[(d.getDay() + 2) % 7]}</DayTitle>
        <ul>{filterTasks(taskList, d.getDay() + 2)}</ul>
      </DayTaskList>
      <DayTaskList>
        <DayTitle>{days[(d.getDay() + 3) % 7]}</DayTitle>
        <ul>{filterTasks(taskList, d.getDay() + 3)}</ul>
      </DayTaskList>
      <DayTaskList>
        <DayTitle>{days[(d.getDay() + 4) % 7]}</DayTitle>
        <ul>{filterTasks(taskList, d.getDay() + 4)}</ul>
      </DayTaskList>
      <DayTaskList>
        <DayTitle>{days[(d.getDay() + 5) % 7]}</DayTitle>
        <ul>{filterTasks(taskList, d.getDay() + 5)}</ul>
      </DayTaskList>
      <DayTaskList>
        <DayTitle>{days[(d.getDay() + 6) % 7]}</DayTitle>
        <ul>{filterTasks(taskList, d.getDay() + 6)}</ul>
      </DayTaskList>
    </StyledTodoistContainer>
  );
};

/**
 * Given a Todoist task array, filters and returns a new array of Todoist tasks that are due on a certain weekday.
 * @param taskList - array of Todoist task objects to filter through
 * @param weekday - integer representing the day of the week to filter only the tasks on this weekday (0 is Sunday, 6 is Saturday)
 * @returns array of Todoist task objects that are due on the given parameter weekday
 */
const filterTasks = (taskList: TaskList, weekday: number) => {
  // create new array of Todoist tasks that only have due date of parameter weekday
  let filteredTasks: TaskList = taskList.filter(
    (task) => new Date(task.due.datetime).getDay() === weekday
  );

  return filteredTasks.map((task, i) => {
    // time string to display on startpage and convert from 24-hour to 12-hour
    let d: Date = new Date(task.due.datetime);
    let hours: number = d.getHours();
    let minutes: number = d.getMinutes();

    let AMorPM: string = hours >= 12 ? "pm" : "am";

    hours = hours % 12 || 12;

    let timeString =
      minutes === 0 ? hours + AMorPM : hours + ":" + minutes + AMorPM;

    return (
      <DayTask
        key={i}
        id={i}
        time={timeString}
        description={task.content}
        category={task.labelIds[0]}
        url={task.url}
      />
    );
  });
};

export default TodoistContainer;
