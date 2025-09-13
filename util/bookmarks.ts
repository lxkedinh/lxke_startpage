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
    href: "https://twitch.com",
    text: "twitch",
  },
];

const productivityBookmarks: Bookmark[] = [
  {
    href: "https://linkedin.com",
    text: "linkedin",
  },
  {
    href: "https://ucsd.joinhandshake.com",
    text: "handshake",
  },
  {
    href: "https://act.ucsd.edu/myTritonlink20/display.htm",
    text: "tritonlink",
  },
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
  productivityBookmarks,
  codingMiscBookmarks,
];
export default allBookmarks;
