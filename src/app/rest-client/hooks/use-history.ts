import { HISTORY_LOCAL_STORAGE_KEY, HISTORY_MAX_ITEMS_IN_LS } from '@/constants';
import { useState, useEffect } from 'react';

interface RequestHistory {
  url: string;
  method: string;
  body: string;
  headers: Array<{ name: string; value: string }>;
  status: number;
  timestamp: number;
}

export const useHistory = () => {
  const [history, setHistory] = useState<RequestHistory[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem(HISTORY_LOCAL_STORAGE_KEY);
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch {
        setHistory([]);
      }
    }
  }, []);

  const saveRequest = (request: Omit<RequestHistory, 'timestamp'>) => {
    const newRequest: RequestHistory = {
      ...request,
      timestamp: Date.now(),
    };

    const updatedHistory = [newRequest, ...history].slice(0, HISTORY_MAX_ITEMS_IN_LS);
    setHistory(updatedHistory);
    localStorage.setItem(HISTORY_LOCAL_STORAGE_KEY, JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(HISTORY_LOCAL_STORAGE_KEY);
  };

  return {
    history,
    saveRequest,
    clearHistory,
  };
};
