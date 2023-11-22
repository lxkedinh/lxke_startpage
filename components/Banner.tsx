import { useMemo } from "react";
import Image from "next/image";
import { banners } from "../util/images";

const Banner = () => {
  const banner = useMemo(
    () => banners[Math.floor(Math.random() * banners.length)],
    []
  );

  return (
    <div className="relative object-cover h-full w-[130px] 2xl:w-[170px]">
      <Image src={banner} alt="banner image" fill className="banner" />
    </div>
  );
};

export default Banner;
