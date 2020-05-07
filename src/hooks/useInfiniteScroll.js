import { useEffect, useState, useRef } from 'react';

export default function useInfiniteScroll(initialItems) {
  const loadingElementRef = useRef();
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [details, setDetails] = useState(initialItems);

  const fetching = useRef(false);

  const observerCallback = async (entry) => {
    if (entry[0].isIntersecting && !fetching.current) {
      // setLoading(() => true);
      const nextUsersBatch = sessionStorage.getItem('next');
      const pervFetchedUsers = JSON.parse(sessionStorage.getItem('users'));
      if (nextUsersBatch && !fetching.current) {
        try {
          fetching.current = true;
          const response = await fetch(nextUsersBatch, { mode: 'cors' });

          if (response.ok) {
            const data = await response.json();

            if (pervFetchedUsers) {
              sessionStorage.setItem(
                'users',
                JSON.stringify([...pervFetchedUsers, ...data])
              );
            } else {
              sessionStorage.setItem('users', JSON.stringify(data));
            }

            const linkHeader = response.headers.get('link');
            if (linkHeader.search('next') === -1) {
              sessionStorage.setItem('next', null);
              setCompleted(() => true);
            } else {
              sessionStorage.setItem(
                'next',
                response.headers
                  .get('link')
                  .split(';')[0]
                  .substring(1)
                  .slice(0, -1)
              );
            }

            setDetails((prevState) => [...prevState, ...data]);
          } else {
            setError(() => true);
          }
          fetching.current = false;
        } catch (err) {
          console.log(err);
          setError(() => true);
        }
      }
      // setLoading(() => false);
    }
  };

  const observer = useRef(
    new IntersectionObserver(observerCallback, {
      threshold: 0.7,
    })
  );

  useEffect(() => {
    setDetails(() => initialItems);
  }, [initialItems]);

  useEffect(() => {
    if (loadingElementRef.current && observer.current)
      observer.current.observe(loadingElementRef.current);

    const ioObserver = observer.current;
    const element = loadingElementRef.current;

    return () => {
      if (ioObserver && element) ioObserver.unobserve(element);
    };
  });

  return {
    details,
    loadingElementRef,
    infiniteScrollError: error,
    thatsItFolks: completed,
  };
}
