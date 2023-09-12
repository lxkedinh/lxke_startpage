import { FunctionComponent, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { animated, useSpring } from "@react-spring/web";
import { NotionTask } from "../types/notion-api";
import { isFullPage } from "@notionhq/client";
import { useModalContext } from "../util/contexts";

interface Props {
  pageId: string;
  time: string;
  title: string;
  typeId: string;
  label: string;
  url: string;
  tasks: NotionTask[];
  setTasks: React.Dispatch<React.SetStateAction<NotionTask[]>>;
}

const DayTask: FunctionComponent<Props> = ({
  pageId,
  time,
  title,
  typeId,
  label,
  url,
  tasks,
  setTasks,
}) => {
  // this must be defined inside component because otherwise tailwind won't
  // detect and include these class names in output css bundle
  // map Notion property ids to tailwind color classes to assign different
  // colors to my different types of tasks on my notion calendar
  const colors: Record<string, string> = {
    "N@<q": "text-ctp-flamingo",
    xedJ: "text-ctp-pink",
    "u|KN": "text-ctp-lavender",
    "a>;l": "text-ctp-green",
    TzAx: "text-ctp-yellow",
    "qxB}": "text-ctp-red",
    sDxk: "text-ctp-peach",
    "[VjC": "text-ctp-sapphire",
    "3ced2350-32fe-4dd3-b0a4-cef6f6135f85": "text-ctp-teal",
  };
  const [springs, api] = useSpring(() => ({
    from: {
      opacity: 1,
    },
    onRest: () => setTasks(tasks.filter((t) => t.pageId !== pageId)),
  }));
  const [hovered, setHovered] = useState<boolean>(false);
  const { setModalOpenState } = useModalContext();

  const handleCompleteTask = async (pageId: string) => {
    try {
      await completeNotionRequest(pageId);

      api.start({
        from: {
          opacity: 1,
        },
        to: {
          opacity: 0,
        },
      });
    } catch (err) {
      console.error("Task completion unsuccessful.", err);
      setModalOpenState(true);
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
          <p className={`${colors[typeId]} font-bold 2xl:font-normal`}>
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
  if (jsonResponse.status === "error" || !isFullPage(jsonResponse.data.page)) {
    throw new Error("Task completion unsuccessful.");
  }

  return jsonResponse;
}

export default DayTask;
