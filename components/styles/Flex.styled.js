import styled from "styled-components";

export const Flex = styled.div`
  display: flex;
  align-items: center;
  flex-flow: ${({ layout }) => layout || "row"};

  .main {
    height: 319px;
  }

  .wrapper {
    margin-top: 250px;
  }

  .bookmarks-container {
    margin-top: 60px;
    justify-content: center;
  }
`;
