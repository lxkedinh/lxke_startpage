import styled from "styled-components";
import { device } from "../../styles/devices";

interface FlexProps {
  layout: string;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  align-items: center;
  flex-flow: ${({ layout }) => layout || "row"};

  .main {
    width: 100%;
  }

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .bookmarks-container {
    justify-content: center;
  }

  @media ${device.laptop} {
    .bookmarks-container {
      margin: 0 50px;
    }
  }
`;

export const Page = styled(Flex)`
  justify-content: center;
  height: 100%;
  align-items: center;
`;
