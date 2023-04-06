import {
  PageObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

export type NotionTask = {
  id: string;
  url: string;
  dateISO: string;
  taskClass: string | null;
  taskType: string;
  title: string;
};

// TODO: create type for Notion page.properties object to make sure fetched
// pages are from my calendar
type CalendarPageObjectResponse = Omit<PageObjectResponse, "properties"> &
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
    Status: {
      type: "status";
      status: SelectPropertyResponse;
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
