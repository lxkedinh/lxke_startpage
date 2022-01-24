import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  margin: 0;
  margin-right: 10px;
  text-align: center;
  background-color: #222436;
  flex-grow: 1;
  height: 500px;
`;

export const StyledTodoistContainer = styled(Container)`
  width: 100%;
  margin: 0;
  margin-top: 10px;
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  color: white;
  font-family: "haxrcorp";
  font-size: 24px;
`;
