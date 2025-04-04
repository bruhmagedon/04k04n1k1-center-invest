export interface IUser {
  email: string;
  first_name: string;
  groups: Groups[];
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  last_name: string;
  username: string;
}

export interface Groups {
  name: string;
}
