import { useEffect, useState, useRef } from 'react';

export default function useInfiniteScroll(initialItems) {
  const loadingElementRef = useRef();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(initialItems);

  const observerCallback = async (entry) => {
    if (entry[0].isIntersecting) {
      setLoading(() => true);
      const nextUsersBatch = sessionStorage.getItem('next');
      const pervFetchedUsers = sessionStorage.getItem('users');
      if (nextUsersBatch) {
        try {
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

            sessionStorage.setItem(
              'next',
              response.headers
                .get('link')
                .split(';')[0]
                .substring(1)
                .slice(0, -1)
            );

            setDetails((prevState) => [...prevState, ...data]);
          }
        } catch (err) {
          console.log(err);
        }
      }
      setLoading(() => false);
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

  return { details, loadingElementRef, loading };
}
