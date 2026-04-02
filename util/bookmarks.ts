type Bookmark = {
  href: string;
  text: string;
};

const socialBookmarks: Bookmark[] = [
  {
    href: "https://gmail.com",
    text: "gmail",
  },
  {
    href: "https://reddit.com",
    text: "reddit",
  },

  {
    href: "https://youtube.com",
    text: "youtube",
  },
  {
    href: "https://twitch.tv",
    text: "twitch",
  },
];

const schoolBookmarks: Bookmark[] = [
  {
    href: "https://ucsd-cse230-loris.github.io/",
    text: "cse230",
  },
  {
    href: "https://ucsd-cse231.github.io/sp24/index.html",
    text: "cse231",
  },
  {
    href: "https://canvas.ucsd.edu",
    text: "canvas",
  },
  {
    href: "https://gradescope.com",
    text: "gradescope",
  },
  {
    href: "https://piazza.com",
    text: "piazza",
  },
  {
    href: "https://ucsd.joinhandshake.com",
    text: "handshake",
  },
  {
    href: "https://act.ucsd.edu/myTritonlink20/display.htm",
    text: "tritonlink",
  },
];

const productivityBookmarks: Bookmark[] = [
  {
    href: "https://www.overleaf.com",
    text: "overleaf",
  },
  {
    href: "https://mail.google.com/a/ucsd.edu",
    text: "ucsd email",
  },
  {
    href: "https://notion.so",
    text: "notion",
  },
  {
    href: "https://linkedin.com",
    text: "linkedin",
  },
];

const codingMiscBookmarks: Bookmark[] = [
  {
    href: "https://github.com",
    text: "github",
  },
  {
    href: "https://leetcode.com",
    text: "leetcode",
  },
  {
    href: "https://reddit.com/r/buildapcsales",
    text: "r/buildapcsales",
  },
  {
    href: "https://reddit.com/r/mechanicalkeyboards",
    text: "r/mechanicalkeyboards",
  },
  {
    href: "https://reddit.com/r/mechmarket",
    text: "r/mechmarket",
  },
];

const allBookmarks: Bookmark[][] = [
  socialBookmarks,
  schoolBookmarks,
  productivityBookmarks,
  codingMiscBookmarks,
];
export default allBookmarks;
