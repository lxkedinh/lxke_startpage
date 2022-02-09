import { getColor } from "@doist/todoist-api-typescript";
import { StyledDayTask } from "./styles/DayTask.styled";

interface Props {
  time?: string;
  description?: string;
  label?: string;
  colorID: number;
  url: string;
}

const DayTask = ({ time, description, label, colorID, url }: Props) => {
  return (
    <StyledDayTask>
      <a href={url}>
        {time} - {description}
        <br />
        <span
          css={`
            /* get color from imported Todoist colors */
            color: ${getColor(colorID).value};
          `}
        >
          {label}
        </span>
      </a>
    </StyledDayTask>
  );
};

export default DayTask;
