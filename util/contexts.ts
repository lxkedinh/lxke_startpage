import { createContext, useContext, Dispatch, SetStateAction } from "react";
import { CalendarTask } from "../types/notion-api";

export const CalendarTasksContext = createContext<CalendarTask[] | undefined>(undefined);

export function useCalendarTasksContext() {
  const calendarTasksContext = useContext(CalendarTasksContext);

  if (!calendarTasksContext) {
    throw new Error("useCalendarTasksContext must be used in a CalendarTasksProvider")
  }

  return calendarTasksContext;
}

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
    throw new Error("useModalContext must be used in a ModalProvider.");
  }
  return modalContext;
}
