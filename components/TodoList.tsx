import { TodoTask } from "../types/notion-api";
import { FunctionComponent, useState } from "react";
import ToDoEntry from "./ToDoEntry";
import { animated, useTransition } from "@react-spring/web";

type Props = {
  todoList: TodoTask[];
};

const TodoList: FunctionComponent<Props> = ({ todoList }) => {
  const [list, setList] = useState<TodoTask[]>(todoList);
  const transitions = useTransition(list, {
    from: { opacity: 1, x: 0 },
    leave: { opacity: 0, x: 40 },
  });

  return (
    <div className="w-[350px] absolute top-4 right-4 font-[Kubasta] bg-ctp-base overflow-x-hidden">
      <h1 className="text-2xl text-ctp-crust bg-ctp-lavender pl-2">to-do</h1>
      {transitions((style, item) => (
        <animated.div
          style={style}
          className="text-ctp-text hover:cursor-pointer hover:font-bold flex flex-row items-center p-1 pl-2"
        >
          <ToDoEntry
            key={item.blockId}
            blockId={item.blockId}
            text={item.text}
            setList={setList}
          />
        </animated.div>
      ))}
    </div>
  );
};

export default TodoList;
