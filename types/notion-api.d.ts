export type NotionTask = {
  url: string;
  date: {
    datetime: Date | undefined;
    id: string;
  } | null;
  class: {
    id: string;
    name: string;
  } | null;
  type: {
    id: string;
    name: string;
  } | null;
  title: string | null;
};

type DateResponse = {
  start: string;
  end: string | null;
  time_zone: TimeZoneRequest | null;
};

export type DateProperty = {
  type: "date";
  date: DateResponse | null;
  id: string;
};

export type ClassProperty = {
  type: "select";
  select: SelectPropertyResponse | null;
  id: string;
};

export type TaskTypeProperty = {
  type: "select";
  select: SelectPropertyResponse | null;
  id: string;
};

export type TitleProperty = {
  type: "title";
  title: Array<RichTextItemResponse>;
  id: string;
};
