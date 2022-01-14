import { StyledBookmark } from "./styles/Bookmark.styled";

const Bookmark = ({ href, text }) => {
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
