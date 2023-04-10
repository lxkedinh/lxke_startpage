import { FunctionComponent } from "react";

interface Props {
  time: string;
  title: string;
  label: string;
  url: string;
}

const DayTask: FunctionComponent<Props> = ({ time, title, label, url }) => {
  return (
    // <StyledDayTask>
    <li className="font-[Kubasta] hover:bg-ctp-mantle">
      <a href={url}>
        {time} - {title}
        <br />
        <span className={colors[label]}>{label}</span>
      </a>
    </li>
    // </StyledDayTask>
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
