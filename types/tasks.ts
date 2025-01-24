export interface IUser {
  id: number;
  first_name: string;
  last_name?: string;
  token?: string;
  avatar?: string;
  last_seen: string;
  terminal_status: number;
  username?: string;
  status?: number;
  permissions?: string[];
  email?: string;
  dob?: string;
  tokenExpiration?: number;
}

export interface ITask {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  due_date?: string;
  est_time?: number;
  priority?: boolean;
  state?: number;
  spent?: number | null;
  // tag?: ITag[];
  assignees: IUser[] | number[] | null;
  tag?: any;
  status?: 0 | 1;
  client?: {
    id: number;
    name: string;
    slug: string;
  };
  project?: {
    id: number;
    name: string;
    slug: string;
  };
  sub_project?: {
    id: number;
    name: string;
    slug: string;
  };
  // author: IUser;
  // time_tracking?: ITimeTracking[];
  author: any;
  time_tracking?: any;
  quick_record?: boolean;

}

export interface ITrackingTask {
  end_time: any;
  id: number;
  is_new_task_tracking: boolean;
  spent: number;
  start_time: string;
  task: ITask;
  user: IUser;
}

export type TState = 1 | 2 | 3 | 4

export enum TaskState {
  New = 1,
  InProgress = 2,
  Review = 3,
  Testing = 4,
  Completed = 5
};

export interface TaskStats {
  task_id: number;
  task: string;
  state: TaskState;
  est_time: number | null;
  client_id: number;
  client: string;
  total_spent: number;
  member: string;
  due_date: string | null;
}


export interface DueStatus {
  overdue: TaskStats[];
  dueSoon: TaskStats[];
  incoming: TaskStats[];
}