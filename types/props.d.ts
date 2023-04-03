import { NotionTask } from "./notion-api"

export interface HomeProps {
    tasks: NotionTask[] | null;
    errorMessage: string | null;
}

export interface NotionTaskListProps {
    tasks: NotionTask[];
}
