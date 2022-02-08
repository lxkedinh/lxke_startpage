// Next.js imports
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/themes";
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

// Todoist related imports
import TodoistContainer from "../components/TodoistContainer";
import { TodoistError } from "../util/TodoistError";
import TodoistErrorContainer from "../components/TodoistErrorContainer";
import { TodoistApi, TodoistRequestError } from "@doist/todoist-api-typescript";

// misc imports
import { Flex, Page } from "../components/styles/Flex.styled";
import Clock from "../components/Clock";

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
        <meta name='viewport' content='width=device-width' />
        <meta charSet='utf-8' />
        <meta name='description' content="Luke's personal start page" />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Page layout='column'>
        <Flex className='wrapper' layout='column'>
          <Clock />
          <Flex className='main' layout='row'>
            <Container>
              <StyledTitle>ジャスミン</StyledTitle>
              <Flex className='bookmarks-container' layout='row'>
                <BookmarksList>
                  {/* Social/Entertainment */}
                  <Bookmark
                    href='https://facebook.com/messages'
                    text='messenger'
                  />
                  <Bookmark href='https://gmail.com' text='gmail' />
                  <Bookmark href='https://reddit.com' text='reddit' />
                  <Bookmark href='https://youtube.com' text='youtube' />
                  <Bookmark href='https://twitch.com' text='twitch' />
                  <Bookmark href='https://animekisa.tv' text='animekisa' />
                  <Bookmark href='https://open.spotify.com' text='spotify' />
                </BookmarksList>
                <BookmarksList>
                  {/* School/Productivity */}
                  <Bookmark href='https://github.com' text='github' />
                  <Bookmark href='https://canvas.cpp.edu' text='canvas' />
                  <Bookmark
                    href='https://my.cpp.edu/uPortal/p/broncodirect'
                    text='broncodirect'
                  />
                  <Bookmark href='https://my.cpp.edu' text='mycpp' />
                  <Bookmark href='https://todoist.com' text='todoist' />
                  <Bookmark href='https://notion.so' text='notion' />
                  <Bookmark href='https://linkedin.com' text='linkedin' />
                </BookmarksList>
                <BookmarksList>
                  {/* Coding/Miscellaneous */}
                  <Bookmark href='https://leetcode.com' text='leetcode' />
                  <Bookmark href='https://amazon.com' text='amazon' />
                  <Bookmark
                    href='https://isthereanydeal.com'
                    text='isthereanydeal'
                  />
                  <Bookmark
                    href='https://reddit.com/r/firefoxcss'
                    text='r/firefoxcss'
                  />
                  <Bookmark
                    href='https://reddit.com/r/buildapcsales'
                    text='r/buildapcsales'
                  />
                  <Bookmark
                    href='https://reddit.com/r/mechanicalkeyboards'
                    text='r/mechanicalkeyboards'
                  />
                  <Bookmark
                    href='https://reddit.com/r/mechmarket'
                    text='r/mechmarket'
                  />
                </BookmarksList>
              </Flex>
            </Container>
            <Banner />
          </Flex>
          {/* properly display corresponding container depending on if error or not */}
          {/* also check for if todo list is empty */}
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const api = new TodoistApi(process.env.TODOIST_API_TOKEN as string);

  // boolean flag to indicate if error occured during data fetching
  let errorProp: boolean = false;

  // fetch Todoist tasks for the next 7 days to display on start page
  // if promise fails, TodoistError is returned instead with following properties
  let taskListQuery: TaskList | TodoistError | string | Error = await api
    .getTasks({ filter: "7 days" })
    .catch((error) => {
      errorProp = true;
      return getTodoistError(error);
    });

  // also fetch Todoist labels for color coding rendered tasks on start page
  // same as above, returns array of Labels or TodoistError
  let labelsQuery: Labels | TodoistError | string | Error = await api
    .getLabels()
    .catch((error) => {
      errorProp = true;
      return getTodoistError(error);
    });

  // data conversion to allow JSON serialization to be passed as props
  const taskListProps: TaskList | TodoistError = JSON.parse(
    JSON.stringify(taskListQuery)
  );
  const labelsProps: Labels | TodoistError = JSON.parse(
    JSON.stringify(labelsQuery)
  );

  return {
    props: { taskListProps, labelsProps, errorProp },
  };
};

/**
 * Helper function that returns a custom TodoistError defined in util/TodoistError.ts to be passed as props
 * @param TodoistRequestError or a regular javascript Error object if Todoist servers encounters a problem it can't handle.
 * @return custom TodoistError object to be passed as props
 */
const getTodoistError = (error: TodoistRequestError | Error): TodoistError => {
  if (error instanceof TodoistRequestError) {
    return new TodoistError(
      error.message,
      error.httpStatusCode,
      error.responseData
    );
  }

  return new TodoistError(error.message);
};
