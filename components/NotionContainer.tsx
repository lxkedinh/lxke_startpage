import { StyledNotionContainer } from "./styles/Container.styled";
import { DayTitle } from "./styles/DayTitle.styled";
import { DayTaskList } from "./styles/DayTaskList.styled";
import { days } from "../util/dateTime";
import DayTask from "./DayTask";
import { NotionTask } from "../types/notion-api";

interface NotionTaskListProps {
  tasks: NotionTask[];
}

const NotionContainer = ({ tasks }: NotionTaskListProps) => {
  const today = new Date().getDay();

  // Modulo the days by 7 to wrap back around at the start of the week
  return (
    <StyledNotionContainer>
      <DayTaskList>
        <DayTitle>{days[today]}</DayTitle>
        <ul>{filterTasks(tasks, today % 7)}</ul>
      </DayTaskList>
      <DayTaskList>
        <DayTitle>{days[(today + 1) % 7]}</DayTitle>
        <ul>{filterTasks(tasks, (today + 1) % 7)}</ul>
      </DayTaskList>
      <DayTaskList>
        <DayTitle>{days[(today + 2) % 7]}</DayTitle>
        <ul>{filterTasks(tasks, (today + 2) % 7)}</ul>
      </DayTaskList>
      <DayTaskList>
        <DayTitle>{days[(today + 3) % 7]}</DayTitle>
        <ul>{filterTasks(tasks, (today + 3) % 7)}</ul>
      </DayTaskList>
      <DayTaskList>
        <DayTitle>{days[(today + 4) % 7]}</DayTitle>
        <ul>{filterTasks(tasks, (today + 4) % 7)}</ul>
      </DayTaskList>
      <DayTaskList>
        <DayTitle>{days[(today + 5) % 7]}</DayTitle>
        <ul>{filterTasks(tasks, (today + 5) % 7)}</ul>
      </DayTaskList>
      <DayTaskList>
        <DayTitle>{days[(today + 6) % 7]}</DayTitle>
        <ul>{filterTasks(tasks, (today + 6) % 7)}</ul>
      </DayTaskList>
    </StyledNotionContainer>
  );
};

export default NotionContainer;

/**
 * Given a Todoist task array, filters and returns a new array of Todoist
 * tasks that are due on a certain weekday.
 * @param taskList - array of Todoist task objects to filter through
 * @param labels - array of Todoist label objects to color code rendered Todoist tasks
 * @param weekday - integer representing the day of the week to filter only the tasks
 *                  on this weekday (0 is Sunday, 6 is Saturday)
 * @returns array of Todoist task objects that are due on the given parameter weekday
 */
const filterTasks = (tasks: NotionTask[], weekday: number) => {
  // create new array of Todoist tasks that only have due date of parameter weekday
  let filteredTasks = tasks.filter((task: NotionTask) => {
    let taskDueDate = new Date(task.date?.datetime as string);
    return taskDueDate.getDay() === weekday;
  });

  // sort the new filtered tasks by ascending due date (soonest to latest)
  // using Date object primitive value
  filteredTasks.sort(
    (firstTask: NotionTask, secondTask: NotionTask): number => {
      let firstDate = new Date(firstTask.date?.datetime as string).valueOf();
      let secondDate = new Date(secondTask.date?.datetime as string).valueOf();

      // returning -1 means firstTask is due sooner than secondTask, vice versa for 1
      // returning 0 means same due time
      if (firstDate < secondDate) {
        return -1;
      } else if (firstDate > secondDate) {
        return 1;
      } else {
        return 0;
      }
    }
  );

  return filteredTasks.map((task: NotionTask) => {
    // create time string to display on startpage and convert from 24-hour to 12-hour
    // the error on this line can be ignored because if task.due.datetime, it is defined in
    // initialization of filteredTasks
    // @ts-expect-error
    let d = new Date(task.date.datetime);
    let timeString = d.getHours() + ":" + d.getMinutes();

    if (!label) {
      return (
        <DayTask
          key={taskItem.id}
          time={timeString}
          description={taskItem.content}
          label={"Inbox"}
          color={"grey"}
          url={taskItem.url}
        />
      );
    } else {
      return (
        <DayTask
          key={taskItem.id}
          time={timeString}
          description={taskItem.content}
          label={label.name}
          color={label.color}
          url={taskItem.url}
        />
      );
    }
  });
};

// Helper functions to correctly render todo list items

/**
 * Calculate the standard time zone and daylight savings time (DST) offsets
 * to be used in isDstObserved() function below
 * @param date - javascript date object
 * @return number that represents the maximum timezone offset from UTC
 */
const getStdTimezoneOffset = (date: Date): number => {
  // we use the months january and july because january is in the middle of PST
  // and july is in the middle of PDT
  let january = new Date(date.getFullYear(), 0, 1);
  let july = new Date(date.getFullYear(), 6, 1);
  return Math.max(january.getTimezoneOffset(), july.getTimezoneOffset());
};

/**
 * Check if DST is currently observed by comparing time zone offsets with standard
 * time zone offset (DST is observed in Los Angeles if we are 7 hours behind of UTC
 * instead of 8)
 * @param date - javascript date object
 * @return number that represents the maximum timezone offset from UTC
 */
const isDstObserved = (date: Date): boolean => {
  return date.getTimezoneOffset() < getStdTimezoneOffset(date);
};

/**
 * Returns number of days in specified month.
 * @param month - integer representing month to look at (0 = January, 1 = February, ...)
 * @param year - 4 digit integer representing year
 * @return number of days in month as integer
 */
const getMonthDays = (month: number, year: number): number => {
  return new Date(year, month + 1, 0).getDate();
};
