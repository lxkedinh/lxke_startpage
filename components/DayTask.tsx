import { StyledDayTask } from "./styles/DayTask.styled";

interface Props {
    time: string;
    title: string;
    type: string;
    taskClass?: string;
    color: string;
    url: string;
}

const DayTask = ({ time, title, type, taskClass, color, url }: Props) => {
    return (
        <StyledDayTask>
            <a href={url}>
                {time} - {title}
                <br />
                <span
                    css={`
            /* get color from imported Todoist colors */
            color: ${getColorByKey(color).hexValue};
          `}
                >
                    {type}
                </span>
            </a>
        </StyledDayTask>
    );
};

export default DayTask;
