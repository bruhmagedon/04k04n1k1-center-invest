import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { searchNpa } from '../api/searchNpa';
import { newAxiosError } from '@/shared/api/types';
import { useState } from 'react';
import { api } from '@/shared/api/axios-instance';
import { useTokenStore } from '@/modules/auth/model/store/authStore';
import { getSearchStatus, SearchStatusResponse } from '../api/getSearchStatus';

// Interface for the search ID response
interface SearchIdResponse {
  search_id: number;
}

// Interface for NPA search results
interface NpaSearchResult {
  id: string;
  name: string;
  relevance_score: number;
  // Add other fields returned by the API as needed
}

interface NpaSearchResponse {
  results: NpaSearchResult[];
  total: number;
}

export const useSearchNpaMutation = () => {
  const queryClient = useQueryClient();
  const [searchId, setSearchId] = useState<string | null>(null);
  const [searchComplete, setSearchComplete] = useState(false);
  const { accessToken } = useTokenStore();

  // Step 1: Submit document and get search ID
  const initialSearchMutation = useMutation<SearchIdResponse, newAxiosError, string>({
    mutationFn: async (content: string) => {
      // Create a text file from the content
      const textBlob = new Blob([content], { type: 'text/plain' });
      const textFile = new File([textBlob], 'document.txt', { type: 'text/plain' });
      
      // Create FormData and append the file
      const formData = new FormData();
      formData.append('file', textFile);
      
      console.log('Sending file to API for search ID:', textFile);
      
      const headers: Record<string, string> = {
        'accept': 'application/json'
      };
      
      // Only add Authorization header if we have a token
      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }
      
      const response = await api.post<SearchIdResponse>(
        '/npa/search/',
        formData,
        { headers }
      );
      
      if (response.status >= 400) {
        throw new Error('Ошибка при поиске НПА');
      }
      
      return response.data;
    },
    onSuccess: (data) => {
      console.log('Search ID received:', data.search_id);
      setSearchId(String(data.task_id));
      
      // Reset search complete status when starting a new search
      setSearchComplete(false);
      
      // Invalidate status query when we get a new search ID
      queryClient.invalidateQueries({ queryKey: ['searchStatus', String(data.search_id)] });
    },
    onError: (error) => {
      console.error('Ошибка при поиске НПА:', error.response);
    }
  });

  // Step 2: Check search status until complete
  const statusQuery = useQuery<SearchStatusResponse, newAxiosError>({
    queryKey: ['searchStatus', searchId],
    queryFn: () => getSearchStatus(searchId!),
    enabled: !!searchId && !searchComplete,
    refetchInterval: (data) => {
        console.log(data)
      // If status is complete, stop polling and trigger results query
      if (data && data.state.data?.search_id) {
        setSearchComplete(true);
        setSearchId(String(data.state.data?.search_id))
        // Invalidate results query when status is complete
        queryClient.invalidateQueries({ queryKey: ['npaSearchResults', searchId] });
        return false;
      }
      // Otherwise poll every 2 seconds
      return 2000;
    },
    retry: 10
  });
  
  // Step 3: Fetch results once search is complete
  const resultsQuery = useQuery<NpaSearchResponse, newAxiosError>({
    queryKey: ['npaSearchResults', searchId],
    queryFn: async () => {
      console.log(`Fetching NPA search results for search ID: ${searchId}`);
      
      const headers: Record<string, string> = {
        'accept': 'application/json'
      };
      
      // Only add Authorization header if we have a token
      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }
      
      const response = await api.get<NpaSearchResponse>(
        `/npa/documents/?ordering=-related_tags_count&search_id=${searchId}`,
        { headers }
      );
      
      if (response.status >= 400) {
        throw new Error('Ошибка при получении результатов поиска НПА');
      }
      
      return response.data;
    },
    enabled: !!searchId && searchComplete, // Only run when search is complete
    staleTime: 5 * 60 * 1000, // Cache results for 5 minutes
  });

  return { 
    initialSearchMutation, 
    statusQuery, 
    resultsQuery,
    searchId,
    searchComplete,
    isLoading: initialSearchMutation.isPending || statusQuery.isLoading || statusQuery.isFetching || (searchComplete && resultsQuery.isLoading),
    error: initialSearchMutation.error || statusQuery.error || resultsQuery.error,
    data: resultsQuery.data
  };
};