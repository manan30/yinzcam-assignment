import { useState, useEffect } from 'react';

export default function useActiveTabManager(tabLength = 0) {
  const [activeTab, setActiveTab] = useState(
    new Array(tabLength).fill(false).map((v, i) => i === 0)
  );

  useEffect(() => {
    setActiveTab(() => new Array(tabLength).fill(false).map((v, i) => i === 0));
  }, [tabLength]);

  function handleActiveTab(index) {
    setActiveTab((prevState) => [
      ...prevState.slice(0, index).map(() => false),
      true,
      ...prevState.slice(index + 1).map(() => false),
    ]);
  }

  return { activeTab, handleActiveTab };
}
