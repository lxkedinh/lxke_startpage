import { FunctionComponent } from "react";

interface Props {
  time: string;
  title: string;
  label: string;
  url: string;
}

const DayTask: FunctionComponent<Props> = ({ time, title, label, url }) => {
  return (
    <li className="font-[Kubasta] text-lg p-1 text-ctp-text hover:bg-ctp-mantle [line-height:1rem] mb-2">
      <a href={url}>
        {time} - {title}
        <br />
        <span className={`${colors[label]} font-bold`}>{label}</span>
      </a>
    </li>
  );
};

export default DayTask;

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
