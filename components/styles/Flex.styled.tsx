import styled from "styled-components";

interface FlexProps {
  layout: string;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  align-items: center;
  flex-flow: ${({ layout }) => layout || "row"};

  .main {
    height: 500px;
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
  align-items: center;
  height: 100%;
  width: 100%;
`;
