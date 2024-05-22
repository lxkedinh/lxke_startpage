import { TodoTask } from "../types/notion-api";
import { FunctionComponent, useState } from "react";
import ToDoEntry from "./ToDoEntry";
import { animated, useTransition } from "@react-spring/web";
import useSWR from "swr";

type Props = {
  todoList: TodoTask[];
};
const TodoList: FunctionComponent<Props> = () => {
  const {
    data: todos,
    error,
    isLoading,
    mutate: mutateTodos,
  } = useSWR<TodoTask[]>("/api/todos", fetchTodos);
  const transitions = useTransition(todos, {
    from: { opacity: 1, x: 0 },
    leave: { opacity: 0, x: 40 },
  });

  if (error || isLoading) {
    return null;
  }

  return (
    <div className="w-[350px] absolute top-4 right-4 font-[Kubasta] bg-ctp-base overflow-x-hidden">
      <h1 className="text-2xl text-ctp-crust bg-ctp-lavender pl-2">to-do</h1>
      {transitions((style, item) => {
        if (!item) {
          return null;
        }

        return (
          <animated.div
            style={style}
            className="text-ctp-text hover:cursor-pointer hover:font-bold flex flex-row items-center p-1 pl-2 h-8"
          >
            <ToDoEntry
              key={item.blockId}
              blockId={item.blockId}
              text={item.text}
              mutateTodos={mutateTodos}
            />
          </animated.div>
        );
      })}
    </div>
  );
};

async function fetchTodos(): Promise<TodoTask[]> {
  const todosResponse = await fetch("/api/todo/fetch").then((r) => r.json());
  return todosResponse.data.todos;
}

export default TodoList;
