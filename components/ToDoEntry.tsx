import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useState,
} from "react";
import { FaCheck } from "react-icons/fa";
import { TodoTask } from "../types/notion-api";
import { animated, useSpring } from "@react-spring/web";
import { useModalContext } from "../util/contexts";

type Props = {
  blockId: string;
  text: string;
  setList: Dispatch<SetStateAction<TodoTask[]>>;
};

const ToDoEntry: FunctionComponent<Props> = ({ blockId, text, setList }) => {
  const [clicked, setClicked] = useState(false);
  const [springs, crossOut] = useSpring(() => ({
    from: {
      width: "0%",
    },
    config: {
      friction: 50,
    },
    onRest: () =>
      setList((current) => current.filter((t) => t.blockId !== blockId)),
  }));
  const { setModalText, setModalOpen } = useModalContext();

  const handleClick = async () => {
    try {
      await completeTodoRequest(blockId);

      setClicked(true);
      crossOut.start({
        from: {
          width: "0%",
        },
        to: {
          width: "100%",
        },
      });
    } catch (err) {
      console.error(err);
      setModalText("Todo task completion unsuccessful. Try again.");
      setModalOpen(true);
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="w-4 h-4 border-ctp-lavender border-2 mr-2 text-center"
      >
        <FaCheck
          className={`text-ctp-green text-xs ${
            clicked ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
      <div className="relative">
        <animated.div
          className="absolute bg-ctp-lavender w-full h-[2px] top-1/2"
          style={springs}
        />
        <span>{text}</span>
      </div>
    </>
  );
};

async function completeTodoRequest(blockId: string) {
  const response = await fetch("/api/todo", {
    method: "POST",
    body: JSON.stringify({
      blockId: blockId,
    }),
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });

  const json = await response.json();
  if (json.status !== "success") {
    throw new Error("Todo task completion unsuccessful.");
  }
}

export default ToDoEntry;
