export type ProjectSummaryItem = {
  name: string;
  hours: number
  pid?: number
}

export interface ProjectSummary {
  [key: string]: ProjectSummaryItem
}

