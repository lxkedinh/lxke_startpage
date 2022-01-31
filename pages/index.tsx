// Next.js imports
import { ThemeProvider } from "styled-components";
import { theme } from "../styles/themes";
import Head from "next/head";
import { GetServerSideProps } from "next";

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

export default function Home({ taskList, labels }: TodoistProps) {
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
                  <Bookmark href='https://open.spotify.com' text='spotify' />
                </BookmarksList>
                <BookmarksList>
                  {/* School/Coding stuff */}
                  <Bookmark href='https://github.com' text='github' />
                  <Bookmark href='https://canvas.cpp.edu' text='canvas' />
                  <Bookmark
                    href='https://my.cpp.edu/uPortal/p/broncodirect'
                    text='broncodirect'
                  />
                  <Bookmark href='https://my.cpp.edu' text='mycpp' />
                  <Bookmark
                    href='https://outlook.office365.com'
                    text='outlook'
                  />
                  <Bookmark href='https://linkedin.com' text='linkedin' />
                </BookmarksList>
                <BookmarksList>
                  <Bookmark href='https://leetcode.com' text='leetcode' />
                  <Bookmark
                    href='https://reddit.com/r/buildapcsales'
                    text='r/buildapcsales'
                  />
                  <Bookmark
                    href='https://reddit.com/r/firefoxcss'
                    text='r/firefoxcss'
                  />
                  <Bookmark
                    href='https://reddit.com/r/mechanicalkeyboards'
                    text='r/mechanicalkeyboards'
                  />
                  <Bookmark
                    href='https://reddit.com/r/mechmarket'
                    text='r/mechmarket'
                  />
                  <Bookmark href='https://animekisa.tv' text='animekisa' />
                </BookmarksList>
              </Flex>
            </Container>
            <Banner />
          </Flex>
          {/* if a message property is present in taskList, it means an error occurred */}
          {/* also check for if todo list is empty */}
          {Object.keys(taskList).includes("message") ||
          taskList.length === 0 ? (
            <TodoistErrorContainer emptyList={taskList.length === 0} />
          ) : (
            <TodoistContainer taskList={taskList} labels={labels} />
          )}
        </Flex>
      </Page>
    </ThemeProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const api = new TodoistApi(process.env.TODOIST_API_TOKEN as string);

  // fetch Todoist tasks for the next 7 days to display on start page
  // if promise fails, TodoistError is returned instead with following properties
  let taskListQuery: TaskList | TodoistError | string | Error = await api
    .getTasks({ filter: "7 days" })
    .catch((error) => getTodoistError(error));

  // also fetch Todoist labels for color coding rendered tasks on start page
  // same as above, returns array of Labels or TodoistError
  let labelsQuery: Labels | TodoistError | string | Error = await api
    .getLabels()
    .catch((error) => getTodoistError(error));

  // data conversion to allow JSON serialization to be passed as props
  const taskList: TaskList | TodoistError = JSON.parse(
    JSON.stringify(taskListQuery)
  );
  const labels: Labels | TodoistError = JSON.parse(JSON.stringify(labelsQuery));

  return {
    props: { taskList, labels },
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
