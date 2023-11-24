import { createContext, useContext, Dispatch, SetStateAction } from "react";
import { CalendarTask } from "../types/notion-api";

export const TasksContext = createContext<CalendarTask[]>([]);

type ModalContextType = {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  modalText: string;
  setModalText: Dispatch<SetStateAction<string>>;
  
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
