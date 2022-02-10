import styled from "styled-components";
import { device } from "../../styles/devices";

export const StyledBanner = styled.div`
  height: 250px;
  width: 130px;
  position: relative; /* necessary property for Next.js Image component */
  object-fit: cover;

  @media ${device.desktop} {
    height: 400px;
    width: 200px;
  }
`;

export const StyledErrorGIF = styled(StyledBanner)`
  width: 100px;
  height: 100px;
`;
