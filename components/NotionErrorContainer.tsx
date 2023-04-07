import * as types from "styled-components/cssprop";
import { StyledNotionErrorContainer } from "./styles/Container.styled";
import { StyledErrorGIF } from "./styles/Banner.styled";
import Image from "next/image";
import mew from "../public/mew transparent.gif";
import { FunctionComponent } from "react";

interface Props {
  errorMessage: string;
}

const NotionErrorContainer: FunctionComponent<Props> = ({ errorMessage }) => {
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
