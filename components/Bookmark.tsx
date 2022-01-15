import { StyledBookmark } from "./styles/Bookmark.styled";
import * as types from 'styled-components/cssprop'

interface BookmarkProps {
  href: string,
  text: string,
}

const Bookmark = ({ href, text }: BookmarkProps) => {
  return (
    <li
      css={`
        text-align: left;
        padding-left: 3px;
        padding-right: 3px;
        height: 16px;
        line-height: 16px;

        &:hover {
          background-color: #1e2030;
        }
      `}
    >
      <StyledBookmark href={href}>{text}</StyledBookmark>
    </li>
  );
};

export default Bookmark;
