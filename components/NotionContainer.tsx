import { days } from "../util/dateTime";
import DayTaskList from "./DayTaskList";

const NotionContainer = () => {
  return (
    <div className="w-full mt-1 flex flex-row justify-start h-[250px] 2xl:h-[300px] bg-ctp-base">
      {days.map((_, index) => (
        <DayTaskList key={index} dayOffset={index} />
      ))}
    </div>
  );
};

export default NotionContainer;
