import * as types from "styled-components/cssprop";
import { StyledTodoistErrorContainer } from "./styles/Container.styled";
import { StyledErrorGIF } from "./styles/Banner.styled";
import Image from "next/image";
import mew from "../public/mew transparent.gif";

interface Props {
  emptyList: boolean;
}

const TodoistErrorContainer = ({ emptyList }: Props) => {
  return (
    <StyledTodoistErrorContainer>
      <p css={``}>
        {/* change message depending if no tasks to do this week or error fetching todo list */}
        {emptyList ? "Nothing to do this week!" : "Could not fetch todo list"}
      </p>
      <StyledErrorGIF>
        <Image src={mew} alt='mew error gif' layout='fill' />
      </StyledErrorGIF>
    </StyledTodoistErrorContainer>
  );
};

export default TodoistErrorContainer;
