import { useTokenStore } from '@/modules/auth/model/store/authStore';
import { queryClient } from '@/shared/api/query-client';

export const useLogout = () => {
  const { clearAccessToken, clearRefreshToken, clearAllTokens } = useTokenStore();

  const logout = () => {
    if (clearAllTokens) {
      clearAllTokens();
    } else {
      clearAccessToken();
      clearRefreshToken();
      localStorage.removeItem('token-storage');
    }
    queryClient.clear();
    console.log('Пользователь вышел из системы');
  };

  return { onLogout: logout };
};
