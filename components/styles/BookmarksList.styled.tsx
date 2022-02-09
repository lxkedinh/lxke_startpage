import styled from "styled-components";
import { device } from "../../styles/devices";

export const BookmarksList = styled.ul`
  width: 170px;
  list-style-type: none;
  padding-left: 0px;
  padding-right: 0px;
  margin: auto 18px;

  @media ${device.laptop} {
    width: 120px;
  }
`;
