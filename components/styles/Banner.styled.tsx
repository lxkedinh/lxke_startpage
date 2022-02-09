import styled from "styled-components";
import { device } from "../../styles/devices";

export const StyledBanner = styled.div`
  height: 400px;
  width: 200px;
  position: relative; /* necessary property for Next.js Image component */
  object-fit: cover;

  @media ${device.laptop} {
    height: 250px;
    width: 130px;
  }
`;

export const StyledErrorGIF = styled(StyledBanner)`
  width: 100px;
  height: 100px;
`;
