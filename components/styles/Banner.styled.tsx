import styled from "styled-components";

export const StyledBanner = styled.div`
  height: 400px;
  width: 200px;
  position: relative; /* necessary property for Next.js Image component */
  object-fit: cover;
`;

export const StyledErrorGIF = styled(StyledBanner)`
  width: 100px;
  height: 100px;
`;
