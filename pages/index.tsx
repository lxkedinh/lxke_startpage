import Head from "next/head";
import { Flex, Page } from "../components/styles/Flex.styled";
import { BookmarksList } from "../components/styles/BookmarksList.styled";
import Bookmark from "../components/Bookmark";
import Clock from "../components/Clock";
import Banner from "../components/Banner";
import TodoistContainer from "../components/TodoistContainer";
import { DayTaskList } from "../components/styles/DayTaskList.styled";
import { Container } from "../components/styles/Container.styled";
import { StyledTitle } from "../components/styles/Title.styled";
import { GetServerSideProps } from "next";
import { Task, TodoistApi } from "@doist/todoist-api-typescript";
import { TaskListProps, TaskList } from "../additional";

export default function Home({ taskList }: TaskListProps) {
  return (
    <>
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
          <TodoistContainer taskList={taskList} />
        </Flex>
      </Page>
    </>
  );
}

// Fetch Todoist tasks for the next 7 days to display on start page
export const getServerSideProps: GetServerSideProps = async (context) => {
  const api = new TodoistApi(process.env.TODOIST_API_TOKEN as string);

  const taskList = await api.getTasks({ filter: "7 days" });

  return {
    props: { taskList },
  };
};