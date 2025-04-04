import { useMutation } from '@tanstack/react-query';

import type { IAuthResponse, RegisterCredentials } from '@/modules/auth/model/types/api';
import type { newAxiosError } from '@/shared/api/types';

import { register } from '@/modules/auth/model/api/register';

import { useTokenStore } from '../store/authStore';

export const useRegisterMutation = () => {
  const { setAccessToken } = useTokenStore();

  return useMutation<IAuthResponse, newAxiosError, RegisterCredentials>({
    mutationFn: register,
    onSuccess: (data) => {
      setAccessToken(data.access_token);
    },
    onError: (error) => {
      console.error('Ошибка при регистрации:', error.response);
    }
  });
};
