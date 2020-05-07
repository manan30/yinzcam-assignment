import { useEffect, useState } from 'react';
import { useDetailsStore } from '../store/DetailsStore';

export default function useFetch(fetchURL, type) {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const { state } = useDetailsStore();

  useEffect(() => {
    if (state[type].error || !state[type].fetched) {
      (async function callback() {
        try {
          const fetchDataRes = await fetch(fetchURL, { mode: 'cors' });

          if (fetchDataRes.ok) {
            const fetchData = await fetchDataRes.json();
            setData(() => fetchData);
          } else {
            setError(() => true);
          }
        } catch (err) {
          console.log(err);
          setError(() => true);
        }
      })();
    }
  }, [fetchURL, state, type]);

  return { data, error };
}
