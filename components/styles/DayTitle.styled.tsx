import styled from "styled-components";
import { device } from "../../styles/devices";

export const DayTitle = styled.p`
  font-size: 24px;
  font-weight: normal;
  font-family: "haxrcorp";
  color: white;

  @media ${device.laptop} {
    font-size: 18px;
  }
`;
