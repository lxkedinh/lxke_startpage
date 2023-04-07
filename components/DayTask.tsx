import { FunctionComponent } from "react";
import { StyledDayTask } from "./styles/DayTask.styled";

interface Props {
  time: string;
  title: string;
  label: string;
  color: string;
  url: string;
}

const DayTask: FunctionComponent<Props> = ({
  time,
  title,
  label,
  color,
  url,
}) => {
  return (
    <StyledDayTask>
      <a href={url}>
        {time} - {title}
        <br />
        <span
          css={`
            color: ${color};
          `}
        >
          {label}
        </span>
      </a>
    </StyledDayTask>
  );
};

export default DayTask;
