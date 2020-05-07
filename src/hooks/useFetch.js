import { useEffect, useState } from 'react';

export default function useFetch(fetchURL, fetchCallback) {
  const [data, setData] = useState();
  const [error, setError] = useState();

  useEffect(() => {
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
  }, [fetchCallback, fetchURL]);

  return { data, error };
}
