import React, { FunctionComponent, useState } from "react";
import { TodoTask } from "../types/notion-api";
import { animated, useSpring } from "@react-spring/web";
import { useModalContext } from "../util/contexts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { KeyedMutator } from "swr";

type Props = {
  blockId: string;
  text: string;
  mutateTodos: KeyedMutator<TodoTask[]>;
};

const ToDoEntry: FunctionComponent<Props> = ({
  blockId,
  text,
  mutateTodos,
}) => {
  const [completed, setCompleted] = useState(false);
  const [springs, crossOut] = useSpring(() => ({
    from: {
      width: "0%",
    },
    config: {
      friction: 30,
    },
    onRest: () => handleCrossoutRest(),
  }));
  const { setModalText, setModalOpen } = useModalContext();

  const handleClick = async () => {
    setCompleted(true);
    crossOut.start({
      from: {
        width: "0%",
      },
      to: {
        width: "100%",
      },
    });
  };

  const handleCrossoutRest = async () => {
    try {
      await completeTodoRequest(blockId);
      mutateTodos((todos) => {
        return todos?.filter((t) => t.blockId !== blockId);
      });
    } catch (err) {
      console.error(err);
      setModalText("Todo completion unsuccessful. Try again!");
      setModalOpen(true);
      setCompleted(false);
    }
  };

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
  const response = await fetch("/api/todo/complete", {
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
