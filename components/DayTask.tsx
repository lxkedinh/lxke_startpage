import { FunctionComponent } from "react";

interface Props {
  pageId: string;
  time: string;
  title: string;
  label: string;
  url: string;
  handleCompleteTask: (pageId: string) => void;
}

const DayTask: FunctionComponent<Props> = ({
  pageId,
  time,
  title,
  label,
  url,
  handleCompleteTask,
}) => {
  // this must be defined inside component because otherwise tailwind won't
  // detect and include these class names in output css bundle
  const colors: Record<string, string> = {
    "Object Oriented Programming": "text-ctp-flamingo",
    "Computers and Society": "text-ctp-pink",
    "Computer Architecture": "text-ctp-lavender",
    "Numerical Methods": "text-ctp-green",
    Ethics: "text-ctp-yellow",
    work: "text-ctp-red",
    icebreak: "text-ctp-peach",
    personal: "text-ctp-sapphire",
    school: "text-ctp-teal",
  };

  return (
    <li
      className="font-[Kubasta] text-lg 2xl:text-xl/5 px-1 pb-1 text-ctp-text hover:bg-ctp-mantle [line-height:1rem] mb-2 cursor-pointer"
      onClick={() => handleCompleteTask(pageId)}
    >
      <a href={url}>
        {time} - {title}
        <br />
        <span className={`${colors[label]} font-bold 2xl:font-normal`}>
          {label}
        </span>
      </a>
    </li>
  );
};

export default DayTask;
