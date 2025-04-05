export interface CreateTaskResponse {
  id: number;
  name: string;
  file: 'md' | 'text';
  user: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    is_staff: boolean;
    is_superuser: boolean;
    groups: [
      {
        name: string;
      }
    ];
  };
  updated_at: string;
  created_at: string;
}
