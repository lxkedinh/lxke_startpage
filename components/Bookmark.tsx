import { StyledBookmark } from "./styles/Bookmark.styled";
import * as types from "styled-components/cssprop";
import { device } from "../styles/devices";

interface BookmarkProps {
  href: string;
  text: string;
}

const Bookmark = ({ href, text }: BookmarkProps) => {
  return (
    <li
      className="text-left w-full h-5 flex items-center"
      // css={`
      //   text-align: left;
      //   padding-left: 3px;
      //   padding-right: 3px;
      //   height: 16px;
      //   margin-bottom: 2px;
      //   line-height: 16px;
      //   width: 100%;

      //   &:hover {
      //     background-color: #1e2030;
      //   }

      //   @media ${device.laptop} {
      //     margin-bottom: 0px;
      //   }
      // `}
    >
      <a className="font-[Kubasta] text-ctp-text hover:underline" href={href}>
        {text}
      </a>
    </li>
  );
};

export default Bookmark;
