import { days } from "../util/dateTime";
import CalendarTaskList from "./CalendarTaskList";

const NotionContainer = () => {
  return (
    <div className="w-full mt-1 flex flex-row justify-start h-[250px] 2xl:h-[300px] bg-ctp-base">
      {days.map((_, index) => (
        <CalendarTaskList key={index} dayOffset={index} />
      ))}
    </div>
  );
};

export default NotionContainer;
