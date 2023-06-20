import { FunctionComponent, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { animated, useSpring } from "@react-spring/web";
import { NotionTask } from "../types/notion-api";
import { isFullPage } from "@notionhq/client";

interface Props {
  pageId: string;
  time: string;
  title: string;
  label: string;
  url: string;
  tasks: NotionTask[];
  setTasks: React.Dispatch<React.SetStateAction<NotionTask[]>>;
}

const DayTask: FunctionComponent<Props> = ({
  pageId,
  time,
  title,
  label,
  url,
  tasks,
  setTasks,
}) => {
  // this must be defined inside component because otherwise tailwind won't
  // detect and include these class names in output css bundle
  const colors: Record<string, string> = {
    "Object Oriented Programming": "text-ctp-flamingo",
    "Computers and Society": "text-ctp-pink",
    "Computer Architecture": "text-ctp-lavender",
    "Numerical Methods": "text-ctp-green",
    Ethics: "text-ctp-yellow",
    work: "text-ctp-red",
    icebreak: "text-ctp-peach",
    personal: "text-ctp-sapphire",
    school: "text-ctp-teal",
  };
  const [springs, api] = useSpring(() => ({
    from: {
      opacity: 1,
    },
    onRest: () => setTasks(tasks.filter((t) => t.id !== pageId)),
  }));
  const [hovered, setHovered] = useState<boolean>(false);

  const handleCompleteTask = async (pageId: string) => {
    const response = await completeNotionRequest(pageId);

    if (response.status === "success" && isFullPage(response.data.page)) {
      api.start({
        from: {
          opacity: 1,
        },
        to: {
          opacity: 0,
        },
      });
    } else {
      console.error("Task completion unsuccessful.", response);
    }
  };

  return (
    <animated.li
      className="font-[Kubasta] text-lg 2xl:text-xl/5 px-1 pb-1 text-ctp-text hover:bg-ctp-mantle [line-height:1rem] mb-2 cursor-pointer"
      style={springs}
    >
      <div
        className="flex flex-row items-center"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <a href={url} className="hover:underline">
          <p>
            {time} - {title}
          </p>
          <p className={`${colors[label]} font-bold 2xl:font-normal`}>
            {label}
          </p>
        </a>
        <div
          className={`${
            hovered ? "scale-100 w-4" : "scale-0 w-0"
          } text-base text-ctp-green transition-all ml-1 p-0`}
          onClick={() => handleCompleteTask(pageId)}
        >
          <FaCheck />
        </div>
      </div>
    </animated.li>
  );
};

async function completeNotionRequest(pageId: string) {
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
  return jsonResponse;
}

export default DayTask;
