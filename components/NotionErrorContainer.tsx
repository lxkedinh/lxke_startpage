import Image from "next/image";
import { errorImages } from "../util/images";
import { FunctionComponent, useMemo } from "react";

interface Props {
  errorMessage: string;
}

const NotionErrorContainer: FunctionComponent<Props> = ({ errorMessage }) => {
  return (
    <div className="w-full h-[250px] 2xl:h-[300px] flex flex-col justify-center items-center text-center bg-ctp-base mt-1">
      <p className="font-[Kubasta] text-ctp-text 2xl:text-2xl">
        {errorMessage}
      </p>
      <div className="object-cover relative w-[100px] h-[100px]">
        <Image src={getRandomErrorImage()} alt="random error gif" />
      </div>
    </div>
  );
};

function getRandomErrorImage() {
  return errorImages[Math.floor(Math.random() * errorImages.length)];
}

export default NotionErrorContainer;
