import styled from "styled-components";

export const DayTaskList = styled.div`
  display: flex;
  flex-flow: column;
  flex: 1;

  ul {
    overflow-y: scroll;
    scrollbar-width: none;
    flex-grow: 1;
  }
`;
