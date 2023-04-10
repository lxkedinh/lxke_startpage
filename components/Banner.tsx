import { StyledBanner } from "./styles/Banner.styled";
import Image from "next/image";
import banner from "../public/m1.gif";

interface BannerProps {
  src: string;
}

const Banner = () => {
  return (
    <div className=" relative object-cover h-full w-[130px]">
      <Image src={banner} alt="banner image" layout="fill" className="banner" />
    </div>
  );
};

export default Banner;
