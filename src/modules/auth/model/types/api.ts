import type { IUser } from '@/modules/user/model/types/user';

export interface IAuthResponse {
  access_token: string;
  user: IUser;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  email: string;
  password: string;
  username: string;
}
