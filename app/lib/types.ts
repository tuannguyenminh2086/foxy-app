export type ProjectSummaryItem = {
  name: string;
  hours: number
}

export interface ProjectSummary {
  [key: string]: ProjectSummaryItem
}

