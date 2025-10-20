// src/components/issues/types.ts
export type IssueStatus = "New" | "In Progress" | "Resolved" | "Pending" | "Completed";

export interface IssuePayload {
  id: number;
  title: string;
  description: string;
  status: IssueStatus;
  priority?: string;
  dueDate?: string | null;
  position?: number;
  project?: any;
  assignee?: any;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: IssueStatus;
  position: number;
}
