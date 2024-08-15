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
  // assignees: IUser[] | number[] | null;
  tag?: any;
  assignees: any;
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
