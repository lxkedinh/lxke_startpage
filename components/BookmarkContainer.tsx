import React from "react";
import allBookmarks from "../util/bookmarks";
import Bookmark from "./Bookmark";
import Banner from "./Banner";

const BookmarkContainer = () => {
  return (
    <div className="flex flex-row w-full items-center h-[250px] 2xl:h-[350px]">
      <div className="flex flex-col justify-center text-center flex-grow mr-1 items-center bg-ctp-base h-full">
        <h1 className="font-[Kubasta] text-ctp-text text-2xl mb-5">
          ジャスミン
        </h1>
        <div className="flex flex-row items-center justify-center">
          {allBookmarks.map((bookmarkSection, index) => (
            <nav key={index} className="flex flex-col w-[120px] list-none mx-5">
              {bookmarkSection.map(({ href, text }, index) => (
                <Bookmark key={index} href={href} text={text} />
              ))}
            </nav>
          ))}
        </div>
      </div>
      <Banner />
    </div>
  );
};

export default BookmarkContainer;
