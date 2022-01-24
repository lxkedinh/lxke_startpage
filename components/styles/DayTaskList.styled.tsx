import styled from "styled-components";

export const DayTaskList = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;
  width: 170px;
  padding: 0 10px;

  ul {
    overflow-y: scroll;
    scrollbar-width: none;
    flex-grow: 1;
  }
`;
