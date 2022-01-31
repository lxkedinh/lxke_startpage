import styled from "styled-components";

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
`;

export const Page = styled(Flex)`
  justify-content: center;
  height: 100%;
  align-items: center;
`;
