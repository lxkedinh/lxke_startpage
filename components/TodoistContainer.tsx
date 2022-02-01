import { StyledTodoistContainer } from "./styles/Container.styled";
import { DayTitle } from "./styles/DayTitle.styled";
import { DayTaskList } from "./styles/DayTaskList.styled";
import { days } from "../util/dateTime";
import DayTask from "./DayTask";
import { Task, Label } from "@doist/todoist-api-typescript";

const TodoistContainer = ({ taskList, labels }: TodoistProps) => {
  const d = new Date();

  // Modulo the days by 7 to wrap back around at the start of the week
  return (
    <StyledTodoistContainer>
      <DayTaskList>
        <DayTitle>{days[d.getDay()]}</DayTitle>
        <ul>{filterTasks(taskList, labels, d.getDay() % 7)}</ul>
      </DayTaskList>
      <DayTaskList>
        <DayTitle>{days[(d.getDay() + 1) % 7]}</DayTitle>
        <ul>{filterTasks(taskList, labels, (d.getDay() + 1) % 7)}</ul>
      </DayTaskList>
      <DayTaskList>
        <DayTitle>{days[(d.getDay() + 2) % 7]}</DayTitle>
        <ul>{filterTasks(taskList, labels, (d.getDay() + 2) % 7)}</ul>
      </DayTaskList>
      <DayTaskList>
        <DayTitle>{days[(d.getDay() + 3) % 7]}</DayTitle>
        <ul>{filterTasks(taskList, labels, (d.getDay() + 3) % 7)}</ul>
      </DayTaskList>
      <DayTaskList>
        <DayTitle>{days[(d.getDay() + 4) % 7]}</DayTitle>
        <ul>{filterTasks(taskList, labels, (d.getDay() + 4) % 7)}</ul>
      </DayTaskList>
      <DayTaskList>
        <DayTitle>{days[(d.getDay() + 5) % 7]}</DayTitle>
        <ul>{filterTasks(taskList, labels, (d.getDay() + 5) % 7)}</ul>
      </DayTaskList>
      <DayTaskList>
        <DayTitle>{days[(d.getDay() + 6) % 7]}</DayTitle>
        <ul>{filterTasks(taskList, labels, (d.getDay() + 6) % 7)}</ul>
      </DayTaskList>
    </StyledTodoistContainer>
  );
};

export default TodoistContainer;

/**
 * Given a Todoist task array, filters and returns a new array of Todoist
 * tasks that are due on a certain weekday.
 * @param taskList - array of Todoist task objects to filter through
 * @param labels - array of Todoist label objects to color code rendered Todoist tasks
 * @param weekday - integer representing the day of the week to filter only the tasks
 *                  on this weekday (0 is Sunday, 6 is Saturday)
 * @returns array of Todoist task objects that are due on the given parameter weekday
 */
const filterTasks = (taskList: TaskList, labels: Labels, weekday: number) => {
  // create new array of Todoist tasks that only have due date of parameter weekday
  let filteredTasks: TaskList = taskList.filter((task: Task) => {
    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    let taskDueDate: Date;

    // make sure task objects have due dates and times attached to them
    if (task && task.due && task.due.datetime) {
      taskDueDate = new Date(task.due.datetime);

      return (
        taskDueDate.getDay() === weekday &&
        // this condition prevents the cases where if today is Monday, the tasks due next Monday
        // are displayed along with the tasks due today
        taskDueDate.getDate() !=
          (today.getDate() + 7) % getMonthDays(currentMonth, currentYear)
      );
    }
    // if no due time, set it to be 11:59 PM of the due date
    else if (task && task.due && task.due.date && !task.due.datetime) {
      // task.due.date is a string in format YYYY-MM-DD
      let year = task.due.date.split("-")[0];
      let month = task.due.date.split("-")[1];
      let day = task.due.date.split("-")[2];

      let d = new Date(parseInt(year), parseInt(month), parseInt(day));

      let hour = "23";
      let minutes = "59";
      let seconds = "00";

      // determine if daylight savings time is currently being observed
      let timezoneOffset: string = isDstObserved(d) ? "-07:00" : "-08:00";

      // add timestring to task.due.datetime in RFC3339 format (YYYY-MM-DDTHH:MM:SS and
      // then +/-HH:MM timezone offset from UTC)
      task.due.datetime = `${year}-${month}-${day}T${hour}:${minutes}:${seconds}${timezoneOffset}`;
      taskDueDate = new Date(task.due.datetime);

      return (
        taskDueDate.getDay() === weekday &&
        (today.getDate() + 7) % getMonthDays(currentMonth, currentYear)
      );
    }

    // the case where a Todoist task has no due or due.date property can be ignored because I only
    // fetch tasks through a filter of a due date in the next 7 days
  });

  // sort the new filtered tasks by ascending due date (soonest to latest)
  filteredTasks.sort((firstTask: Task, secondTask: Task): number => {
    let firstTime = new Date(firstTask.due?.datetime as string);
    let secondTime = new Date(secondTask.due?.datetime as string);

    // returning -1 means firstTask is due sooner than secondTask, vice versa for 1
    // returning 0 means same due time
    if (firstTime.getHours() < secondTime.getHours()) return -1;
    else if (firstTime.getHours() > secondTime.getHours()) return 1;
    else {
      if (firstTime.getMinutes() < secondTime.getMinutes()) return -1;
      else if (firstTime.getMinutes() > secondTime.getMinutes()) return 1;
      else return 0;
    }
  });

  return filteredTasks.map((taskItem: Task, i: number) => {
    // create time string to display on startpage and convert from 24-hour to 12-hour
    // the error on this line can be ignored because if task.due.datetime, it is defined in
    // initialization of filteredTasks
    // @ts-expect-error
    let d: Date = new Date(taskItem.due.datetime);

    let hours: number = d.getHours();
    let minutes: number = d.getMinutes();

    let AMorPM: string = hours >= 12 ? "pm" : "am";
    // the || 12 below accounts for 12pm and 12am when modulus 12 returns 0
    hours = hours % 12 || 12;

    // if the due time is exactly on the start of an hour on the clock, get rid of the :00
    // (ie. display 11am instead of 11:00am)
    let timeString =
      minutes === 0 ? hours + AMorPM : hours + ":" + minutes + AMorPM;

    // find corresponding task label from Label[] from props
    let label: Label = labels.find(({ id }) => id === taskItem.labelIds[0]);
    console.log("taskItem: ", taskItem);
    console.log("label: ", label);

    // if the task doesn't have a label, set it to Inbox by default
    if (!label) {
      return (
        <DayTask
          key={i}
          id={i}
          time={timeString}
          description={taskItem.content}
          label={"Inbox"}
          colorID={48}
          url={taskItem.url}
        />
      );
    } else {
      return (
        <DayTask
          key={i}
          id={i}
          time={timeString}
          description={taskItem.content}
          label={label.name}
          colorID={label.color}
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
