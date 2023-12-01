import Image from "next/image";
import { banners } from "../util/images";

const Banner = () => {
  return (
    <div className="relative object-cover h-full w-[130px] 2xl:w-[170px]">
      <Image
        src={getRandomBanner()}
        alt="banner image"
        fill
        className="banner"
      />
    </div>
  );
};

function getRandomBanner() {
  return banners[Math.floor(Math.random() * banners.length)];
}

export default Banner;
