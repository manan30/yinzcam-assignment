import { useEffect, useState, useRef } from 'react';

export default function useInfiniteScroll(callback, initialItems) {
  const loadingElementRef = useRef();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({ ...initialItems });

  const observerCallback = async (entry) => {
    if (entry[0].isIntersecting) {
      setLoading(() => true);
      try {
        if (details.hasMore) {
          const {
            data: { data },
          } = await callback(details.next.page);
          setDetails((prevState) => ({
            ...data,
            results: [...prevState.results, ...data.results],
          }));
        }
      } catch (err) {
        console.log(err);
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
