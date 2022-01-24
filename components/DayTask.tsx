import * as types from "styled-components/cssprop";

interface Props {
  id: number;
  time?: string;
  description?: string;
  category?: number;
  url: string;
}

const DayTask = ({ id, time, description, category, url }: Props) => {
  // Determine text color for category depending on passed Todoist project id
  switch (category) {
    case 2159564228:
      let categoryColor = "#96c3eb";
      break;
  }

  return (
    <li
      css={`
        list-style-type: none;
        font-family: "haxrcorp";
        color: white;
        font-size: 24px;
      `}
    >
      <a href={url}>
        {time} - {description}
        <br />
        <span
          css={`
            color: #96c3eb;
          `}
        >
          School
        </span>
      </a>
    </li>
  );
};

export default DayTask;
