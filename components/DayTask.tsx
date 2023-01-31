import { getColorByKey } from "@doist/todoist-api-typescript";
import { StyledDayTask } from "./styles/DayTask.styled";

interface Props {
  time?: string;
  description?: string;
  label?: string;
  color: string;
  url: string;
}

const DayTask = ({ time, description, label, color, url }: Props) => {
  console.log(getColorByKey('yellow'));
  return (
    <StyledDayTask>
      <a href={url}>
        {time} - {description}
        <br />
        <span
          css={`
            /* get color from imported Todoist colors */
            color: ${getColorByKey(color).hexValue};
          `}
        >
          {label}
        </span>
      </a>
    </StyledDayTask>
  );
};

export default DayTask;
