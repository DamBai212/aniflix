import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchAnimeCatalog } from '../api/animeApiClient.js';

const AnimeDataContext = createContext(null);

export function AnimeDataProvider({ children }) {
  const [animeCatalog, setAnimeCatalog] = useState([]);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  const [requestVersion, setRequestVersion] = useState(0);

  const reloadAnimeCatalog = () => {
    setRequestVersion((currentValue) => currentValue + 1);
  };

  useEffect(() => {
    let isSubscribed = true;

    const loadAnimeCatalog = async () => {
      setStatus('loading');
      setError(null);

      try {
        const nextCatalog = await fetchAnimeCatalog();

        if (!isSubscribed) {
          return;
        }

        setAnimeCatalog(nextCatalog);
        setStatus('success');
      } catch (loadError) {
        if (!isSubscribed) {
          return;
        }

        setAnimeCatalog([]);
        setError(loadError);
        setStatus('error');
      }
    };

    loadAnimeCatalog();

    return () => {
      isSubscribed = false;
    };
  }, [requestVersion]);

  return (
    <AnimeDataContext.Provider value={{ animeCatalog, status, error, reloadAnimeCatalog }}>
      {children}
    </AnimeDataContext.Provider>
  );
}

export function useAnimeData() {
  const context = useContext(AnimeDataContext);

  if (!context) {
    throw new Error('useAnimeData must be used within an AnimeDataProvider');
  }

  return context;
}
