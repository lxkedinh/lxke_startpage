// Next.js imports
import Head from "next/head";
import { GetServerSideProps } from "next";
// React imports
import { FunctionComponent } from "react";
// component imports
import { Container } from "../components/styles/Container.styled";
import { StyledTitle } from "../components/styles/Title.styled";
import { BookmarksList } from "../components/styles/BookmarksList.styled";
import Bookmark from "../components/Bookmark";
import Banner from "../components/Banner";
import NotionContainer from "../components/NotionContainer";
import NotionErrorContainer from "../components/NotionErrorContainer";
import { Flex, Page } from "../components/styles/Flex.styled";
import Clock from "../components/Clock";
// Notion imports
import { NotionTask } from "../types/notion-api";
import { isCalendarPage } from "../util/notion-api";
import {
  APIErrorCode,
  Client,
  ClientErrorCode,
  isFullPage,
  isNotionClientError,
  iteratePaginatedAPI,
} from "@notionhq/client";
// misc imports
import { PageError, isPageError, PageErrorCode } from "../util/PageError";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";

type SuccessProps = {
  success: true;
  tasks: NotionTask[];
  errorMessage: null;
};
type FailureProps = {
  success: false;
  tasks: null;
  errorMessage: string;
};
type HomeProps = SuccessProps | FailureProps;

const Home: FunctionComponent<HomeProps> = ({
  success,
  tasks,
  errorMessage,
}: HomeProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>ジャスミン</title>
        <meta name="viewport" content="width=device-width" />
        <meta charSet="utf-8" />
        <meta name="description" content="Luke's personal start page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Page layout="column">
        <Flex className="wrapper" layout="column">
          <Clock />
          <Flex className="main" layout="row">
            <Container>
              <StyledTitle>ジャスミン</StyledTitle>
              <Flex className="bookmarks-container" layout="row">
                <BookmarksList>
                  {/* Social/Entertainment */}
                  <Bookmark
                    href="https://facebook.com/messages"
                    text="messenger"
                  />
                  <Bookmark href="https://gmail.com" text="gmail" />
                  <Bookmark href="https://reddit.com" text="reddit" />
                  <Bookmark href="https://youtube.com" text="youtube" />
                  <Bookmark href="https://twitch.com" text="twitch" />
                  <Bookmark href="https://animekisa.tv" text="animekisa" />
                  <Bookmark href="https://open.spotify.com" text="spotify" />
                </BookmarksList>
                <BookmarksList>
                  {/* School/Productivity */}
                  <Bookmark href="https://github.com" text="github" />
                  <Bookmark href="https://canvas.cpp.edu" text="canvas" />
                  <Bookmark
                    href="https://idp.cpp.edu/idp/profile/cas/login?service=https://cmsweb.cms.cpp.edu/psp/CPOMPRDM/EMPLOYEE/SA/c/SA_LEARNER_SERVICES.SSS_STUDENT_CENTER.GBL?1=1"
                    text="broncodirect"
                  />
                  <Bookmark href="https://my.cpp.edu" text="mycpp" />
                  <Bookmark href="https://todoist.com" text="todoist" />
                  <Bookmark href="https://notion.so" text="notion" />
                  <Bookmark href="https://linkedin.com" text="linkedin" />
                </BookmarksList>
                <BookmarksList>
                  {/* Coding/Miscellaneous */}
                  <Bookmark href="https://leetcode.com" text="leetcode" />
                  <Bookmark href="https://amazon.com" text="amazon" />
                  <Bookmark
                    href="https://isthereanydeal.com"
                    text="isthereanydeal"
                  />
                  <Bookmark
                    href="https://reddit.com/r/firefoxcss"
                    text="r/firefoxcss"
                  />
                  <Bookmark
                    href="https://reddit.com/r/buildapcsales"
                    text="r/buildapcsales"
                  />
                  <Bookmark
                    href="https://reddit.com/r/mechanicalkeyboards"
                    text="r/mechanicalkeyboards"
                  />
                  <Bookmark
                    href="https://reddit.com/r/mechmarket"
                    text="r/mechmarket"
                  />
                </BookmarksList>
              </Flex>
            </Container>
            <Banner />
          </Flex>
          {/* properly display corresponding container depending on if error or not */}
          {success ? (
            <NotionContainer tasks={tasks} />
          ) : (
            <NotionErrorContainer errorMessage={errorMessage} />
          )}
        </Flex>
      </Page>
    </ThemeProvider>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const notion = new Client({ auth: process.env.NOTION_TOKEN });

  const today = new Date();
  const sevenDaysFromToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 7
  );

  const databaseFilter = {
    database_id: process.env.NOTION_DB_ID as string,
    filter: {
      and: [
        {
          property: "Date",
          date: {
            after: today.toISOString(),
          },
        },
        {
          property: "Date",
          date: {
            before: sevenDaysFromToday.toISOString(),
          },
        },
        {
          property: "Status",
          status: {
            equals: "Incomplete",
          },
        },
      ],
    },
  };

  try {
    const notionTasks: NotionTask[] = [];

    for await (const page of iteratePaginatedAPI(
      notion.databases.query,
      databaseFilter
    )) {
      if (!isFullPage(page)) {
        continue;
      }
      if (!isCalendarPage(page)) {
        continue;
      }

      notionTasks.push({
        id: page.id,
        url: page.url,
        dateISO: page.properties.Date.date.start,
        taskClass: page.properties.Class.select?.name || null,
        taskType: page.properties.Type.select.name,
        title: page.properties.Title.title[0].plain_text,
      });
    }

    if (notionTasks.length === 0) {
      throw new PageError(PageErrorCode.NoTasks);
    }

    return {
      props: {
        success: true,
        tasks: notionTasks,
        errorMessage: null,
      },
    };
  } catch (error) {
    console.error(error);
    let errorMessage: string = "Unknown error occurred.";

    if (isNotionClientError(error) || isPageError(error)) {
      switch (error.code) {
        case PageErrorCode.NoTasks:
          errorMessage = "No tasks to do this week!";
          break;
        case ClientErrorCode.RequestTimeout:
          errorMessage = "Request timed out. Internet problems?";
          break;
        case APIErrorCode.Unauthorized:
          errorMessage = "Unauthorized request.";
          break;
        case APIErrorCode.RestrictedResource:
          errorMessage = "Tried to access restricted resource.";
          break;
        case APIErrorCode.RateLimited:
          errorMessage = "Rate limited. Slow down and try again later.";
          break;
        case APIErrorCode.ServiceUnavailable:
          errorMessage = "Notion is unavailable right now.";
          break;
        case APIErrorCode.InvalidJSON:
          errorMessage = "Invalid JSON in request.";
          break;
        case APIErrorCode.ConflictError:
          errorMessage = "Conflict error occurred.";
          break;
        case APIErrorCode.InvalidRequest:
          errorMessage = "Invalid request.";
          break;
        case APIErrorCode.ObjectNotFound:
          errorMessage = "Data could not be found.";
          break;
        case APIErrorCode.ValidationError:
          errorMessage = "Validation error occurred.";
          break;
        case APIErrorCode.InvalidRequestURL:
          errorMessage = "Invalid request URL.";
          break;
        case APIErrorCode.InternalServerError:
          errorMessage = "Unexpected Notion server error occurred.";
          break;
      }
    }

    return {
      props: {
        success: false,
        tasks: null,
        errorMessage,
      },
    };
  }
};
