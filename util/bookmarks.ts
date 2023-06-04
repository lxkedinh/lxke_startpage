import { Bookmark } from "../types";

const socialBookmarks: Bookmark[] = [
  {
    href: "https://facebook.com/messages",
    text: "messenger",
  },
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
    href: "https://9anime.to",
    text: "9anime",
  },
  {
    href: "https://open.spotify.com",
    text: "spotify",
  },
];

const productivityBookmarks: Bookmark[] = [
  {
    href: "https://github.com",
    text: "github",
  },
  {
    href: "https://canvas.cpp.edu",
    text: "canvas",
  },
  {
    href: "https://idp.cpp.edu/idp/profile/cas/login?service=https://cmsweb.cms.cpp.edu/psp/CPOMPRDM/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL?1=1",
    text: "broncodirect",
  },
  {
    href: "https://my.cpp.edu",
    text: "mycpp",
  },
  {
    href: "https://todoist.com",
    text: "todoist",
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
