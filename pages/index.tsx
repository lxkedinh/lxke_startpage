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
import NotionContainer from "../components/NotionContainer";
import NotionErrorContainer from "../components/NotionErrorContainer";
import {
    APIErrorCode,
    Client,
    ClientErrorCode,
    collectPaginatedAPI,
    isFullPage,
    isNotionClientError,
    iteratePaginatedAPI,
} from "@notionhq/client";

// misc imports
import { Flex, Page } from "../components/styles/Flex.styled";
import Clock from "../components/Clock";
import {
    NotionTask,
    TaskTypeProperty,
    TaskClassProperty,
    TaskTitleProperty,
} from "../types/notion-api";

interface HomeProps {
    tasks: NotionTask[] | null;
    errorMessage: string | null;
}

export default function Home({ tasks, errorMessage }: HomeProps) {
    //   const [taskList, setTaskList] = useState<TaskList>([]);
    //   const [labels, setLabels] = useState<Labels>([]);
    //   const [serverError, setServerError] = useState<boolean>(false);
    //   const [isEmptyList, setIsEmptyList] = useState<boolean>(false);

    //   useEffect(() => {
    //     // error while data fetching
    //     setServerError(errorProp);
    //     // treat case of empty task list as error
    //     if (taskListProps.length === 0) setIsEmptyList(true);
    //     setTaskList(taskListProps);
    //     setLabels(labelsProps);
    //   }, [taskListProps, labelsProps, errorProp]);

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
                    {errorMessage ? (
                        <NotionErrorContainer errorMessage={errorMessage} />
                    ) : (
                        <NotionContainer tasks={tasks as NotionTask[]} />
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
        }
    };

    try {
        for await (const page of iteratePaginatedAPI(notion.databases.query, databaseFilter)) {
            if (!isFullPage(page) || !page.properties["Date"]) {
                continue;
            }

            let dateISO: string = "";
            let taskClass: TaskClassProperty;
            let taskType: TaskTypeProperty;
            let title: TaskTitleProperty;

            if (page.properties["Date"].type == "date") {
                // ok cast, I always have dates for my Notion tasks
                dateISO = page.properties["Date"].date?.start as string;
            }
            if (page.properties["Class"].type == "select") {
                // class name property
                taskClass = {
                    id: page.properties["Class"].select.id,
                    name: page.properties["Class"].select.name,
                };
            } else if (property.id == "cTSw" && property.select) {
                // task type property
                taskType = {
                    id: property.select.id,
                    name: property.select.name,
                };
            }
            title = property.title[0].plain_text;


        }

        const pagesResponse = await collectPaginatedAPI(notion.databases.query, {
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
        });

        const notionTasks: NotionTask[] = [];

        for (const page of pagesResponse) {
            if (!isFullPage(page)) {
                continue;
            }

            let taskDate: string = "";
            let taskClass: TaskClassProperty;
            let taskType: TaskTypeProperty;
            let taskTitle: TaskTitleProperty;

            Object.keys(page.properties).forEach((key) => {
                const property = page.properties[key];

                switch (property.type) {
                    case "date": // task due date property
                        // ok cast, I always have dates for my Notion tasks
                        taskDate = property.date?.start as string;
                        break;
                    case "select":
                        if (property.id == "MZ%5Dx" && property.select) {
                            // class name property
                            taskClass = {
                                id: property.select.id,
                                name: property.select.name,
                            };
                        } else if (property.id == "cTSw" && property.select) {
                            // task type property
                            taskType = {
                                id: property.select.id,
                                name: property.select.name,
                            };
                        }
                        break;
                    case "title":
                        taskTitle = property.title[0].plain_text;
                        break;
                }
            });

            notionTasks.push({
                id: page.id,
                url: page.url,
                dateISO: taskDate,
                class: taskClass,
                type: taskType,
                title: taskTitle,
            });
        }

        return {
            props: {
                tasks: notionTasks,
                errorMessage: null,
            },
        };
    } catch (error) {
        console.error(error);
        let errorMessage: string = "Unknown error occurred.";

        if (isNotionClientError(error)) {
            switch (error.code) {
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
                tasks: null,
                errorMessage,
            },
        };
    }
};
