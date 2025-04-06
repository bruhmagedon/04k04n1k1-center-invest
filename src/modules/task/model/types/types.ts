export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  groups: { name: string }[];
}

export interface Task {
  id: number;
  name: string;
  file: string;
  text: string;
  user: User;
  updated_at: string;
  created_at: string;
}

export interface TasksResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Task[];
}

export interface CreateTaskResponse {
  id: number;
  name: string;
  file: string;
  updated_at: string;
  created_at: string;
}
