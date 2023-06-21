import { createContext, useContext } from "react";
import { NotionTask } from "../types/notion-api";

export const TasksContext = createContext<NotionTask[]>([]);

type ModalContextType = {
  setModalOpenState: React.Dispatch<React.SetStateAction<boolean>>;
};
export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
);
export function useModalContext() {
  const modalContext = useContext(ModalContext);
  if (!modalContext) {
    throw new Error("Modal context is not set.");
  }
  return modalContext;
}
