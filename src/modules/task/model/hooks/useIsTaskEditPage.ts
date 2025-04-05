import { matchPath, useLocation } from 'react-router';

export const useIsTaskEditPage = (): boolean => {
  const location = useLocation();

  const match = matchPath('/task/:id', location.pathname);

  return match !== null;
};
