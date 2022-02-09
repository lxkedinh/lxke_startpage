import styled from "styled-components";
import { device } from "../../styles/devices";

export const StyledDayTask = styled.li`
  list-style-type: none;
  font-family: "haxrcorp";
  color: white;
  font-size: 24px;

  &:hover {
    text-decoration: underline;
  }

  @media ${device.laptop} {
    font-size: 16px;
  }
`;
