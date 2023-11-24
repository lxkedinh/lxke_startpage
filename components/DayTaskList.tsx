import { FunctionComponent, useState, useContext } from "react";
import { CalendarTask } from "../types/notion-api";
import DayTask from "./DayTask";
import { days } from "../util/dateTime";
import { TasksContext } from "../util/contexts";

type Props = {
  dayOffset: number;
};

const DayTaskList: FunctionComponent<Props> = ({ dayOffset }) => {
  const today = new Date().getDay();
  const allTasks = useContext(TasksContext);
  const todayTasks = allTasks.filter(
    (t) => new Date(t.dateISO).getDay() === (today + dayOffset) % 7
  );
  const [tasks, setTasks] = useState<CalendarTask[]>(todayTasks);

  return (
    <div className="flex flex-col flex-1 px-2 text-center">
      <h1 className="font-[Kubasta] text-ctp-text text-lg">
        {days[(today + dayOffset) % 7]}
      </h1>
      <ul className="overflow-y-scroll [scrollbar-width:none]">
        {tasks.sort(sortTasks).map((task) => {
          let d = new Date(task.dateISO);
          let timeString =
            d.getHours().toString().padStart(2, "0") +
            ":" +
            d.getMinutes().toString().padStart(2, "0");

          return (
            <DayTask
              key={task.pageId}
              pageId={task.pageId}
              time={timeString}
              title={task.title}
              typeId={task.typeId}
              label={task.label}
              url={task.url}
              setTasks={setTasks}
            ></DayTask>
          );
        })}
      </ul>
    </div>
  );
};

// sort by ascending due date (soonest to latest)
// using Date object primitive value
const sortTasks = (a: CalendarTask, b: CalendarTask): number => {
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

export default DayTaskList;
