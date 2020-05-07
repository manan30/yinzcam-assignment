import { useState } from 'react';
import Fuse from 'fuse.js';
import { FUSE_OPTIONS as options } from '../utils/Constants';

function search({ fuse, data, term }) {
  const results = fuse.search(term).map(({ item }) => item);
  return term ? results : data;
}

function useSearch({ data = [] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const fuse = new Fuse(data, options);
  const results = search({ fuse, data, term: searchTerm });
  const reset = () => setSearchTerm('');
  return { results, search: setSearchTerm, searchTerm, reset };
}

export default useSearch;
