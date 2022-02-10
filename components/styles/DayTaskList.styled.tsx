import styled from "styled-components";
import { device } from "../../styles/devices";

export const DayTaskList = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
  width: 120px;
  padding: 0 10px;

  ul {
    overflow-y: scroll;
    scrollbar-width: none;
    flex-grow: 1;
  }

  @media ${device.desktop} {
    width: 170px;
  }
`;
