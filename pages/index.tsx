// Next.js imports
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";
import Head from "next/head";
import { GetServerSideProps } from "next";

// React imports
import { useState, useEffect } from "react";

// bookmark container and banner imports
import { Container } from "../components/styles/Container.styled";
import { StyledTitle } from "../components/styles/Title.styled";
import { BookmarksList } from "../components/styles/BookmarksList.styled";
import Bookmark from "../components/Bookmark";
import Banner from "../components/Banner";

// Notion related imports
import TodoistContainer from "../components/TodoistContainer";
import { TodoistError } from "../util/TodoistError";
import TodoistErrorContainer from "../components/TodoistErrorContainer";
import {
  APIResponseError,
  Client,
  collectPaginatedAPI,
  isFullPage,
} from "@notionhq/client";

// misc imports
import { Flex, Page } from "../components/styles/Flex.styled";
import Clock from "../components/Clock";
import {
  PageObjectResponse,
  TitlePropertyItemObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import {
  NotionTask,
  DateProperty,
  ClassProperty,
  TaskTypeProperty,
  TitleProperty,
} from "../types/notion-api";

export default function Home({
  taskListProps,
  labelsProps,
  errorProp,
}: globalProps) {
  const [taskList, setTaskList] = useState<TaskList>([]);
  const [labels, setLabels] = useState<Labels>([]);
  const [serverError, setServerError] = useState<boolean>(false);
  const [isEmptyList, setIsEmptyList] = useState<boolean>(false);

  useEffect(() => {
    // error while data fetching
    setServerError(errorProp);
    // treat case of empty task list as error
    if (taskListProps.length === 0) setIsEmptyList(true);
    setTaskList(taskListProps);
    setLabels(labelsProps);
  }, [taskListProps, labelsProps, errorProp]);

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
          also check for if todo list is empty
          {serverError || isEmptyList ? (
            <TodoistErrorContainer isEmptyList={isEmptyList} />
          ) : (
            <TodoistContainer taskListProps={taskList} labelsProps={labels} />
          )}
        </Flex>
      </Page>
    </ThemeProvider>
  );
}

// type NotionTaskProperties = {
//   type: "date";
//   date: DateResponse | null;
//   id: string;
// } | ;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const notion = new Client({ auth: process.env.NOTION_TOKEN });

  try {
    const pagesResponse = await collectPaginatedAPI(notion.databases.query, {
      database_id: process.env.NOTION_DB_ID as string,
      filter: {
        and: [
          {
            property: "Date",
            date: {
              next_week: {},
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
    });

    const notionTasks: NotionTask[] = [];

    for (const page of pagesResponse) {
      if (!isFullPage(page)) {
        continue;
      }

      const notionTask: NotionTask = {
        url: page.url,
        date: null,
        class: null,
        type: null,
        title: null,
      };

      Object.keys(page.properties).forEach((key) => {
        const property = page.properties[key];

        switch (property.type) {
          case "date": // task due date property
            // ok cast, I always have dates for my Notion tasks
            const dateString = property.date?.start as string;

            notionTask.date = {
              datetime: new Date(dateString),
              id: property.id,
            };
        }
      });
    }
  } catch (err) {
    if (err instanceof APIResponseError) console.log("api blah blah error");
  }

  return {
    props: {},
  };
};
