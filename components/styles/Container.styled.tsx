import styled from "styled-components";
import { device } from "../../styles/devices";

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  margin: 0;
  margin-right: 5px;
  text-align: center;
  background-color: #222436;
  flex-grow: 1;
  height: 250px;

  @media ${device.desktop} {
    margin-right: 10px;
    height: 400px;
  }
`;

export const StyledNotionContainer = styled(Container)`
  width: 100%;
  margin: 0;
  margin-top: 5px;
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  color: white;
  font-family: "haxrcorp";
  font-size: 24px;

  @media ${device.desktop} {
    margin-top: 10px;
  }
`;

export const StyledNotionErrorContainer = styled(StyledNotionContainer)`
  width: 1000px;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;
