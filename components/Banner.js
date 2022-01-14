import { StyledBanner } from "./styles/Banner.styled";

const Banner = ({ src }) => {
  return (
    <StyledBanner>
      <img src={src} alt="" />
    </StyledBanner>
  );
};

export default Banner;
