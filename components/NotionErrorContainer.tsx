import * as types from "styled-components/cssprop";
import { StyledNotionErrorContainer } from "./styles/Container.styled";
import { StyledErrorGIF } from "./styles/Banner.styled";
import Image from "next/image";
import mew from "../public/mew transparent.gif";

interface Props {
  errorMessage: string;
}

const NotionErrorContainer = ({ errorMessage }: Props) => {
  return (
    <StyledNotionErrorContainer>
      <p>{errorMessage}</p>
      <StyledErrorGIF>
        <Image src={mew} alt="mew error gif" layout="fill" />
      </StyledErrorGIF>
    </StyledNotionErrorContainer>
  );
};

export default NotionErrorContainer;
