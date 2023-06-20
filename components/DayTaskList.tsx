import { FunctionComponent, useState } from "react";
import { NotionTask } from "../types/notion-api";
import DayTask from "./DayTask";
import { isFullPage } from "@notionhq/client";

type DayTaskListProps = {
  day: string;
  tasksProps: NotionTask[];
};

const DayTaskList: FunctionComponent<DayTaskListProps> = ({
  day,
  tasksProps,
}: DayTaskListProps) => {
  const [tasks, setTasks] = useState<NotionTask[]>(tasksProps);

  return (
    <div className="flex flex-col flex-1 w-[120px] px-2 text-center">
      <h1 className="font-[Kubasta] text-ctp-text text-lg">{day}</h1>
      <ul>
        {tasks.sort(sortTasks).map((task) => {
          let d = new Date(task.dateISO);
          let timeString =
            d.getHours() + ":" + d.getMinutes().toString().padStart(2, "0");

          const handleCompleteTask = async (pageId: string) => {
            const response = await fetch("/api/tasks/complete", {
              method: "POST",
              body: JSON.stringify({
                pageId: pageId,
              }),
              headers: new Headers({
                "Content-Type": "application/json",
              }),
            });
            const jsonResponse = await response.json();

            if (
              jsonResponse.status === "success" &&
              isFullPage(jsonResponse.data.page)
            ) {
              setTasks(tasks.filter((t) => t.id !== pageId));
            } else {
              console.error("Task completion unsuccessful.", response);
            }
          };

          return (
            <DayTask
              key={task.id}
              pageId={task.id}
              time={timeString}
              title={task.title}
              label={task.taskClass || task.taskType}
              url={task.url}
              handleCompleteTask={handleCompleteTask}
            ></DayTask>
          );
        })}
      </ul>
    </div>
  );
};

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

export default DayTaskList;
