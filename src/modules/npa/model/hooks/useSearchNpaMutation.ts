import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { newAxiosError } from '@/shared/api/types';
import { useState, useEffect } from 'react';
import { api } from '@/shared/api/axios-instance';
import { useTokenStore } from '@/modules/auth/model/store/authStore';
import { getSearchStatus, SearchStatusResponse } from '../api/getSearchStatus';
import { toast } from 'sonner';


interface SearchIdResponse {
  search_id: number;
  task_id: string;
}


interface NpaSearchResult {
  id: string;
  name: string;
  relevance_score: number;
}

interface NpaSearchResponse {
  results: NpaSearchResult[];
  total: number;
  count: number;
}

const SEARCH_ID_KEY = 'npa_search_id';
const TASK_ID_KEY = 'npa_task_id';
const SEARCH_COMPLETE_KEY = 'npa_search_complete';
const RESULTS_FETCHED_KEY = 'npa_results_fetched'; // Add this new key

export const useSearchNpaMutation = () => {
  const queryClient = useQueryClient();
  const [searchId, setSearchId] = useState<string | null>(() => {
    return localStorage.getItem(SEARCH_ID_KEY);
  });
  const [searchComplete, setSearchComplete] = useState<boolean>(() => {
    return localStorage.getItem(SEARCH_COMPLETE_KEY) === 'true';
  });
  const { accessToken } = useTokenStore();
  const [taskId, setTaskId] = useState<string | null>(() => {
    return localStorage.getItem(TASK_ID_KEY);
  });
  // Add a state to track if results have been fetched for the current search
  const [resultsFetched, setResultsFetched] = useState<boolean>(() => {
    return localStorage.getItem(RESULTS_FETCHED_KEY) === 'true';
  });

  useEffect(() => {
    if (searchId) {
      localStorage.setItem(SEARCH_ID_KEY, searchId);
    } else {
      localStorage.removeItem(SEARCH_ID_KEY);
    }
  }, [searchId]);

  useEffect(() => {
    localStorage.setItem(SEARCH_COMPLETE_KEY, String(searchComplete));
  }, [searchComplete]);

  useEffect(() => {
    if (taskId) {
      localStorage.setItem(TASK_ID_KEY, taskId);
    } else {
      localStorage.removeItem(TASK_ID_KEY);
    }
  }, [taskId]);


  useEffect(() => {
    localStorage.setItem(RESULTS_FETCHED_KEY, String(resultsFetched));
  }, [resultsFetched]);

  const fetchNpaSearchResults = async (searchId: string | null) => {
    console.log(`Fetching NPA search results for search ID: ${searchId}`);

   

    const response = await api.get<NpaSearchResponse>(
      `/npa/documents/?limit=100&ordering=-related_tags_count&search_id=${searchId}`,
      
    );
  
    if (response.status >= 400) {
      throw new Error('Ошибка при получении результатов поиска НПА');
    }

    toast.success(`Обработка завершена`, { description: `Найдено ${response.data.count} НПА` });
    console.log('Search results data:', response.data);
    
    // Mark that results have been fetched for this search
    setResultsFetched(true);
    
    return response.data;
  };

  const fetchResults = async () => {
    if (!searchId) {
      console.error('Cannot fetch results: No search ID available');
      return null;
    }

    try {
      const results = await fetchNpaSearchResults(searchId);
      queryClient.setQueryData(['npaSearchResults', searchId], results);
      return results;
    } catch (error) {
      console.error('Error fetching NPA results:', error);
      throw error;
    }
  };

  const initialSearchMutation = useMutation<SearchIdResponse, newAxiosError, string>({
    mutationFn: async (content: string) => {
      const textBlob = new Blob([content], { type: 'text/plain' });
      const textFile = new File([textBlob], 'document.txt', { type: 'text/plain' });

      const formData = new FormData();
      formData.append('file', textFile);

      console.log('Sending file to API for search ID:', textFile);

      const headers: Record<string, string> = {
        accept: 'application/json'
      };

      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }

      const response = await api.post<SearchIdResponse>('/npa/search/', formData, { headers });
      if (response.status >= 400) {
        throw new Error('Ошибка при поиске НПА');
      }

      return response.data;
    },
    onSuccess: (data) => {
      console.log('Search ID received:', data.search_id);

      // Reset the fetched flag when starting a new search
      setResultsFetched(false);
      setSearchId(String(data.task_id));
      setSearchComplete(false);
      setTaskId(String(data.search_id));
      queryClient.invalidateQueries({ queryKey: ['searchStatus', searchId] });
    },
    onError: (error) => {
      console.error('Ошибка при поиске НПА:', error.response?.data?.detail);
    }
  });

  const statusQuery = useQuery<SearchStatusResponse, newAxiosError>({
    queryKey: ['searchStatus', searchId],
    queryFn: () => getSearchStatus(searchId!),
    enabled: !searchComplete && !!searchId,
    refetchInterval: (data) => {
      if (searchId === 'undefined') {
        setSearchComplete(true);
        console.log(taskId)
        setSearchId(taskId);
        queryClient.invalidateQueries({ queryKey: ['npaSearchResults', searchId] });
        return false;
      }

 
      if (data && data.state && data.state.data) {
        setSearchComplete(true);
        queryClient.invalidateQueries({ queryKey: ['npaSearchResults', searchId] });
        return false;
      }

      return 2000;
    },
    retry: 10
  });

  const resultsQuery = useQuery<NpaSearchResponse, newAxiosError>({
    queryKey: ['npaSearchResults', taskId], 
    queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 15000));
        return fetchNpaSearchResults(taskId);
      },
    // Only enable the query if we haven't fetched results yet for this search
    enabled: !!taskId && searchComplete && !resultsFetched, 
    staleTime: 5 * 60 * 1000,
    

    //@ts-ignore
    onError: (error) => {
      toast.error('Ошибка загрузки результатов', {
        description: error.message
      });
    }
  });

  const clearSearchState = () => {
    setSearchId(null);
    setSearchComplete(false);
    setTaskId(null);
    setResultsFetched(false);
    localStorage.removeItem(SEARCH_ID_KEY);
    localStorage.removeItem(TASK_ID_KEY);
    localStorage.removeItem(SEARCH_COMPLETE_KEY);
    localStorage.removeItem(RESULTS_FETCHED_KEY);
  };

  return {
    mutate: initialSearchMutation.mutate,
    initialSearchMutation,
    statusQuery,
    resultsQuery,
    searchId,
    searchComplete,
    resultsFetched, // Expose this state to components
    isLoading:
      initialSearchMutation.isPending ||
      statusQuery.isLoading ||
      statusQuery.isFetching ||
      (searchComplete && !resultsFetched && resultsQuery.isLoading),
    error: initialSearchMutation.error || statusQuery.error || resultsQuery.error,
    data: resultsQuery.data,
    fetchResults,
    clearSearchState
  };
};
