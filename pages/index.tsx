// Next.js imports
import Head from "next/head";
import { GetServerSideProps } from "next";
import Image from "next/image";
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
import banner from "../public/m1.gif";
import allBookmarks from "../util/bookmarks";

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

      <main>
        <Clock />
        <div className="flex flex-row w-full items-center h-[250px]">
          <div className="flex flex-col justify-center text-center flex-grow mr-1 items-center bg-ctp-base h-full">
            <h1 className="font-[Kubasta] text-ctp-text text-2xl mb-5">
              ジャスミン
            </h1>
            <div className="flex flex-row items-center justify-center">
              {allBookmarks.map((bookmarkSection) => (
                <nav
                  key={bookmarkSection[0].text}
                  className="flex flex-col w-[120px] list-none mx-5"
                >
                  {bookmarkSection.map(({ href, text }) => (
                    <Bookmark key={text} href={href} text={text} />
                  ))}
                </nav>
              ))}
            </div>
          </div>
          <div className=" relative object-cover h-full w-[130px]">
            <Image
              src={banner}
              alt="banner image"
              layout="fill"
              className="banner"
            />
          </div>
        </div>
        {/* properly display corresponding container depending on if error or not */}
        {success ? (
          <NotionContainer tasks={tasks} />
        ) : (
          <NotionErrorContainer errorMessage={errorMessage} />
        )}
      </main>
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
          property: "Done",
          checkbox: {
            equals: false,
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
