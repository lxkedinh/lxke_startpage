import styled from "styled-components";
import { device } from "../../styles/devices";

export const StyledTitle = styled.h1`
  display: inline-block;
  overflow: hidden;
  line-height: 18px;
  font-family: haxrcorp, monospace;
  font-size: 32px;
  width: 300px;
  line-height: 1;
  margin: 0px auto 80px auto;
  color: #e6e6e6;

  @media ${device.laptop} {
    font-size: 22px;
    margin-bottom: 40px;
  }
`;
