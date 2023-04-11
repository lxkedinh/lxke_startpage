import { StyledBookmark } from "./styles/Bookmark.styled";
import * as types from "styled-components/cssprop";
import { device } from "../styles/devices";

interface BookmarkProps {
  href: string;
  text: string;
}

const Bookmark = ({ href, text }: BookmarkProps) => {
  return (
    <li className="text-left w-full h-5 flex items-center">
      <a className="font-[Kubasta] text-ctp-text hover:underline" href={href}>
        {text}
      </a>
    </li>
  );
};

export default Bookmark;
