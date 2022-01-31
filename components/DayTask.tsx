import * as types from "styled-components/cssprop";
import { getColor } from "@doist/todoist-api-typescript";

interface Props {
  id: number;
  time?: string;
  description?: string;
  label?: string;
  colorID: number;
  url: string;
}

const DayTask = ({ id, time, description, label, colorID, url }: Props) => {
  return (
    <li
      css={`
        list-style-type: none;
        font-family: "haxrcorp";
        color: white;
        font-size: 24px;

        &:hover {
          text-decoration: underline;
        }
      `}
    >
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
    </li>
  );
};

export default DayTask;
