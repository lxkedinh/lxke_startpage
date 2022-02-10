import styled from "styled-components";
import { device } from "../../styles/devices";

export const StyledClock = styled.p`
  color: white;
  font-size: 16px;
  font-family: "haxrcorp";
  position: relative;
  left: 4px;
  align-self: flex-start;

  @media ${device.desktop} {
    font-size: 24px;
  }
`;
