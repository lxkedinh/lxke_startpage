import { StyledBanner } from "./styles/Banner.styled";
import Image from "next/image";
import banner from "../public/m1.gif";

interface BannerProps {
  src: string;
}

const Banner = () => {
  return (
    <StyledBanner>
      <Image
        src={banner}
        alt='banner image'
        layout='responsive'
        className='banner'
      />
    </StyledBanner>
  );
};

export default Banner;
