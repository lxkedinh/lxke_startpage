import {
  PageObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

declare type NotionTask = {
  id: string;
  url: string;
  dateISO: string;
  // university class this task belongs to, can be null for personal/work tasks
  taskClass: string | null;
  taskType: string;
  title: string;
};

declare type CalendarPageObjectResponse = Omit<
  PageObjectResponse,
  "properties"
> &
  NotionCalendarProperties;

type NotionCalendarProperties = {
  properties: {
    Date: {
      type: "date";
      date: DateResponse;
      id: string;
    };
    Title: {
      type: "title";
      title: Array<RichTextItemResponse>;
      id: string;
    };
    Type: {
      type: "select";
      select: SelectPropertyResponse;
      id: string;
    };
    Class: {
      type: "select";
      select: SelectPropertyResponse | null;
      id: string;
    };
    Done: {
      type: "checkbox";
      checkbox: boolean;
      id: string;
    };
  };
};

type DateResponse = {
  start: string;
  end: string | null;
  time_zone: TimeZoneRequest | null;
};

type SelectPropertyResponse = {
  id: StringRequest;
  name: StringRequest;
  color: SelectColor;
};
