// Next.js imports
import Head from "next/head";
import { GetServerSideProps } from "next";
// React imports
import { FunctionComponent, useState } from "react";
// component imports
import BookmarkContainer from "../components/BookmarkContainer";
import NotionContainer from "../components/NotionContainer";
import NotionErrorContainer from "../components/NotionErrorContainer";
import Clock from "../components/Clock";
// Notion imports
import { NotionTask } from "../types/notion-api";
import { isCalendarPage, notion } from "../util/notion-api";
import {
  APIErrorCode,
  ClientErrorCode,
  isFullPage,
  isNotionClientError,
  iteratePaginatedAPI,
} from "@notionhq/client";
// misc imports
import { PageError, isPageError, PageErrorCode } from "../util/PageError";
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";
import { HomeProps } from "../types";
import { TasksContext, ModalContext } from "../util/contexts";
import Modal from "../components/Modal";

const Home: FunctionComponent<HomeProps> = (props: HomeProps) => {
  const [isModalOpen, setModalOpenState] = useState<boolean>(false);

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>ジャスミン</title>
        <meta name="viewport" content="width=device-width" />
        <meta charSet="utf-8" />
        <meta name="description" content="Luke's personal start page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ModalContext.Provider value={{ setModalOpenState }}>
        <main className="w-[700px] 2xl:w-[850px]">
          <Clock />
          <BookmarkContainer />
          {/* properly display corresponding container depending on if error or not */}
          {props.status === "success" ? (
            <TasksContext.Provider value={props.data.tasks}>
              <NotionContainer />
            </TasksContext.Provider>
          ) : (
            <NotionErrorContainer errorMessage={props.message} />
          )}
        </main>
        {isModalOpen && <Modal />}
      </ModalContext.Provider>
    </ThemeProvider>
  );
};
export default Home;

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
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
        status: "success",
        data: {
          tasks: notionTasks,
        },
      },
    };
  } catch (error) {
    console.error(error);
    // default error message if not internal Notion error
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
        status: "error",
        message: errorMessage,
      },
    };
  }
};
