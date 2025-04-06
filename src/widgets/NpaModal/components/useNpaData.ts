import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api/axios-instance';

interface UseNpaDataParams {
  searchTerm: string;
  currentPage: number;
  pageSize: number;
}

export interface NpaDocument {
  id: number;
  name: string;
  file: string;
  tags: {
    id: number;
    name: string;
  }[];
  source: string;
  related_tags_count: number;
}

interface NpaResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NpaDocument[];
}

interface UseNpaDataProps {
  searchTerm: string;
  currentPage: number;
  pageSize: number;
  searchId?: number;
}

export const useNpaData = ({ searchTerm, currentPage, pageSize, searchId }: UseNpaDataProps) => {
  const offset = (currentPage - 1) * pageSize;

  const { data, isLoading, error } = useQuery({
    queryKey: ['npa-documents', searchTerm, currentPage, pageSize, searchId],
    queryFn: async () => {
      const params = new URLSearchParams({
        limit: pageSize.toString(),
        offset: offset.toString()
      });

      if (searchTerm) {
        params.append('search', searchTerm);
      }

      if (searchId) {
        params.append('search_id', searchId.toString());
      }

      const response = await api.get<NpaResponse>(`/npa/documents/?${params.toString()}`);
      return response.data;
    }
  });

  const totalItems = data?.count || 0;
  const totalPages = Math.ceil(totalItems / pageSize);
  const paginatedItems = data?.results || [];

  return {
    paginatedItems,
    totalPages,
    totalItems,
    isLoading,
    error
  };
};
