import { useTokenStore } from '@/modules/auth/model/store/authStore';
import { queryClient } from '@/shared/api/query-client';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const { clearAccessToken, clearRefreshToken, clearAllTokens } = useTokenStore();
  const navigate = useNavigate();

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

    navigate('/');
  };

  return { onLogout: logout };
};
