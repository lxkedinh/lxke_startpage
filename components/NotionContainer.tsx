import { StyledNotionContainer } from "./styles/Container.styled";
import { DayTitle } from "./styles/DayTitle.styled";
import { DayTaskList } from "./styles/DayTaskList.styled";
import { days } from "../util/dateTime";
import DayTask from "./DayTask";
import { NotionTask } from "../types/notion-api";
import { FunctionComponent } from "react";
import { getColorByKey } from "../util/colors";

interface Props {
  tasks: NotionTask[];
}

const NotionContainer: FunctionComponent<Props> = ({ tasks }) => {
  const today = new Date().getDay();

  // Modulo the days by 7 to wrap back around at the start of the week
  return (
    <StyledNotionContainer>
      <DayTaskList>
        <DayTitle>{days[today]}</DayTitle>
        <ul>
          {tasks
            .filter((t) => new Date(t.dateISO).getDay() === today % 7)
            .sort(sortTasks)
            .map(mapToComponents)}
        </ul>
      </DayTaskList>
      <DayTaskList>
        <DayTitle>{days[(today + 1) % 7]}</DayTitle>
        <ul>
          {tasks
            .filter((t) => new Date(t.dateISO).getDay() === (today + 1) % 7)
            .sort(sortTasks)
            .map(mapToComponents)}
        </ul>
      </DayTaskList>
      <DayTaskList>
        <DayTitle>{days[(today + 2) % 7]}</DayTitle>
        <ul>
          {tasks
            .filter((t) => new Date(t.dateISO).getDay() === (today + 2) % 7)
            .sort(sortTasks)
            .map(mapToComponents)}
        </ul>
      </DayTaskList>
      <DayTaskList>
        <DayTitle>{days[(today + 3) % 7]}</DayTitle>
        <ul>
          {tasks
            .filter((t) => new Date(t.dateISO).getDay() === (today + 3) % 7)
            .sort(sortTasks)
            .map(mapToComponents)}
        </ul>
      </DayTaskList>
      <DayTaskList>
        <DayTitle>{days[(today + 4) % 7]}</DayTitle>
        <ul>
          {tasks
            .filter((t) => new Date(t.dateISO).getDay() === (today + 4) % 7)
            .sort(sortTasks)
            .map(mapToComponents)}
        </ul>
      </DayTaskList>
      <DayTaskList>
        <DayTitle>{days[(today + 5) % 7]}</DayTitle>
        <ul>
          {tasks
            .filter((t) => new Date(t.dateISO).getDay() === (today + 5) % 7)
            .sort(sortTasks)
            .map(mapToComponents)}
        </ul>
      </DayTaskList>
      <DayTaskList>
        <DayTitle>{days[(today + 6) % 7]}</DayTitle>
        <ul>
          {tasks
            .filter((t) => new Date(t.dateISO).getDay() === (today + 6) % 7)
            .sort(sortTasks)
            .map(mapToComponents)}
        </ul>
      </DayTaskList>
    </StyledNotionContainer>
  );
};

export default NotionContainer;

// sort by ascending due date (soonest to latest)
// using Date object primitive value
const sortTasks = (a: NotionTask, b: NotionTask): number => {
  let firstDate = new Date(a.dateISO).valueOf();
  let secondDate = new Date(b.dateISO).valueOf();

  if (firstDate < secondDate) {
    return -1;
  } else if (firstDate > secondDate) {
    return 1;
  } else {
    return 0;
  }
};

const mapToComponents = (value: NotionTask): JSX.Element => {
  let d = new Date(value.dateISO);
  let timeString =
    d.getHours() + ":" + d.getMinutes().toString().padStart(2, "0");

  return (
    <DayTask
      key={value.id}
      time={timeString}
      title={value.title}
      label={value.taskClass || value.taskType}
      color={getColorByKey(value.taskClass || value.taskType)}
      url={value.url}
    ></DayTask>
  );
};
