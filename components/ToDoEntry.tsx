import React, {
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useState,
} from "react";
import { TodoTask } from "../types/notion-api";
import { animated, useSpring } from "@react-spring/web";
import { useModalContext } from "../util/contexts";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";

type Props = {
  blockId: string;
  text: string;
  setList: Dispatch<SetStateAction<TodoTask[]>>;
};

const ToDoEntry: FunctionComponent<Props> = ({ blockId, text, setList }) => {
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [springs, crossOut] = useSpring(() => ({
    from: {
      width: "0%",
    },
    config: {
      friction: 30,
    },
    onRest: () => setList((prev) => prev.filter((t) => t.blockId !== blockId)),
  }));
  const { setModalText, setModalOpen } = useModalContext();

  const handleClick = async () => {
    try {
      setLoading(true);
      await completeTodoRequest(blockId);
      setLoading(false);
      setCompleted(true);
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
      setLoading(false);
      setModalText("Todo task completion unsuccessful. Try again.");
      setModalOpen(true);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center">
        <FontAwesomeIcon icon={faSpinner} spinPulse />
      </div>
    );
  }

  return (
    <>
      {completed ? (
        <FontAwesomeIcon icon={faCheckSquare} className="text-ctp-green" />
      ) : (
        <FontAwesomeIcon icon={faSquare} onClick={handleClick} />
      )}
      <div className="ml-3 relative">
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
