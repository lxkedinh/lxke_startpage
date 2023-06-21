import Image from "next/image";
import { errorImages } from "../util/images";
import { FunctionComponent, useMemo } from "react";

interface Props {
  errorMessage: string;
}

const NotionErrorContainer: FunctionComponent<Props> = ({ errorMessage }) => {
  const errorImage = useMemo(
    () => errorImages[Math.floor(Math.random() * errorImages.length)],
    []
  );

  return (
    <div className="w-full h-[250px] 2xl:h-[300px] flex flex-col justify-center items-center text-center bg-ctp-base mt-1">
      <p className="font-[Kubasta] text-ctp-text 2xl:text-2xl">
        {errorMessage}
      </p>
      <div className="object-cover relative w-[100px] h-[100px]">
        <Image src={errorImage} alt="mew error gif" layout="fill" />
      </div>
    </div>
  );
};

export default NotionErrorContainer;
