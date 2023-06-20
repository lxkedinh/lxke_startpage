import { createContext } from "react";
import { NotionTask } from "../types/notion-api";

export const TasksContext = createContext<NotionTask[]>([]);
