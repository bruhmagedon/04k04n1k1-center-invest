import type { AxiosError } from 'axios';

import { useMutation } from '@tanstack/react-query';

import type { IAuthResponse, LoginCredentials } from '@/modules/auth/model/types/api';

import { login } from '@/modules/auth/model/api/login';

import { useTokenStore } from '../store/authStore';

export const useLoginMutation = () => {
  const { setAccessToken } = useTokenStore();

  return useMutation<IAuthResponse, AxiosError, LoginCredentials>({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.clear();
      setAccessToken(data.access_token);
    },
    onError: (error) => {
      console.error('Ошибка при входе в систему:', error);
    }
  });
};
