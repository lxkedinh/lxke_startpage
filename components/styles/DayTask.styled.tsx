import styled from "styled-components";
import { device } from "../../styles/devices";

export const StyledDayTask = styled.li`
  list-style-type: none;
  font-family: "haxrcorp";
  color: white;
  font-size: 16px;

  &:hover {
    text-decoration: underline;
  }

  @media ${device.desktop} {
    font-size: 24px;
  }
`;
