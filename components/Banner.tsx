import { StyledBanner } from "./styles/Banner.styled";
import Image from "next/image";

interface BannerProps {
  src: string;
}

const Banner = ({ src }: BannerProps) => {
  return (
    <StyledBanner>
      <Image
        src={src}
        alt="banner image"
        className="banner"
        height={319}
        width={129}
      />
    </StyledBanner>
  );
};

export default Banner;
