import { FunctionComponent } from "react";

interface Props {
  href: string;
  text: string;
}

const Bookmark: FunctionComponent<Props> = ({ href, text }) => {
  return (
    <li className="w-full h-5 flex items-center justify-center">
      <a className="font-[Kubasta] text-ctp-text hover:underline" href={href}>
        {text}
      </a>
    </li>
  );
};

export default Bookmark;
