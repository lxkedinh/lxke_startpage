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
  {
    href: "https://aniwave.to/home",
    text: "aniwave",
  },
];

const productivityBookmarks: Bookmark[] = [
  {
    href: "https://linkedin.com",
    text: "linkedin",
  },
  {
    href: "https://cpp.joinhandshake.com/stu/postings",
    text: "handshake",
  },
  {
    href: "https://idp.cpp.edu/idp/profile/cas/login?service=https://cmsweb.cms.cpp.edu/psp/CPOMPRDM/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL?1=1",
    text: "broncodirect",
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
    href: "https://app.clickup.com",
    text: "clickup",
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
    href: "https://ffxivteamcraft.com",
    text: "ffxivteamcraft",
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
