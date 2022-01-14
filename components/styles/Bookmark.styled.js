import styled from "styled-components";

export const StyledBookmark = styled.a.attrs((props) => ({
  href: props.href,
}))`
  font-size: 16px;
  font-family: "haxrcorp";
  text-decoration: none;
  line-height: 16px;
  color: #e6e6e6;

  &:hover {
    text-decoration: underline;
  }
`;
