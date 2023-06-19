import { NotionTask } from "./notion-api";

export type SuccessProps = {
  status: "success";
  data: {
    tasks: NotionTask[];
  };
};

export type FailureProps = {
  status: "error";
  message: string;
};

export type HomeProps = SuccessProps | FailureProps;

export type Bookmark = {
  href: string;
  text: string;
};
