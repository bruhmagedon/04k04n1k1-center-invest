import type { AxiosError } from 'axios';

interface CustomApi {
  detail: string;

}

export type newAxiosError = AxiosError<CustomApi>;
