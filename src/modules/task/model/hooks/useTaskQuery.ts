import { useQuery } from '@tanstack/react-query';
import { Task } from '../types/types';
import { api } from '@/shared/api/axios-instance';
import axios from 'axios';

interface UseTaskQueryOptions {
  id: string | number;
  enabled?: boolean;
  fetchMdFile?: boolean;
}

export const useTaskQuery = ({ id, enabled = true, fetchMdFile = false }: UseTaskQueryOptions) => {
  return useQuery<Task>({
    queryKey: ['task', id, { fetchMdFile }],
    queryFn: async () => {
      const { data } = await api.get<Task>(`/npa/analytics/${id}/`);

      if (fetchMdFile && data.file) {
        try {
          // Используем обычный axios вместо вашего api-инстанса
          // Это позволит избежать добавления baseURL к абсолютному URL
          console.log('Пытаемся получить файл:', data.file);

          const mdResponse = await axios.get(data.file, {
            responseType: 'text',
            withCredentials: false,
            timeout: 30000
          });

          const mdContent = mdResponse.data;
          console.log('MD файл успешно получен, длина:', mdContent.length);

          return {
            ...data,
            mdContent
          };
        } catch (error: any) {
          console.error('Детальная ошибка при получении MD файла:', {
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            url: data.file
          });

          return {
            ...data,
            mdError: `Не удалось загрузить файл: ${data.file}. Ошибка: ${error.message}`
          };
        }
      }

      return data;
    },
    enabled
  });
};
