import { days } from "../util/dateTime";
import { NotionTask } from "../types/notion-api";
import { FunctionComponent } from "react";
import DayTaskList from "./DayTaskList";

interface Props {
  tasks: NotionTask[];
}

const NotionContainer: FunctionComponent<Props> = ({ tasks }) => {
  const today = new Date().getDay();

  // Modulo the days by 7 to wrap back around at the start of the week
  return (
    <div className="w-full mt-1 flex flex-row justify-start h-[250px] 2xl:h-[300px] bg-ctp-base">
      {days.map((_, index) => (
        <DayTaskList
          key={days[(today + index) % 7]}
          day={days[(today + index) % 7]}
          tasksProps={tasks.filter(
            (t) => new Date(t.dateISO).getDay() === (today + index) % 7
          )}
        />
      ))}
    </div>
  );
};

export default NotionContainer;
