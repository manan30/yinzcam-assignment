import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../../api';
import { UserCard } from '../../components/Card';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import useSearch from '../../hooks/useSearch';
import './index.css';

function Main() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const {
    details,
    loadingElementRef,
    infiniteScrollError,
    thatsItFolks,
  } = useInfiniteScroll(users);
  const { search, searchTerm, results } = useSearch({
    data: details,
  });
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const storedData = sessionStorage.getItem('users');
    if (!storedData) {
      (async function getUsers() {
        try {
          const response = await fetchUsers(15);

          if (response.ok) {
            const data = (await response.json()).map(
              ({ login: username, avatar_url: avatarURL }) => ({
                username,
                avatarURL,
              })
            );

            sessionStorage.setItem('users', JSON.stringify(data));
            const linkHeader = response.headers.get('link');
            if (linkHeader.search('next') !== -1) {
              sessionStorage.setItem(
                'next',
                linkHeader.split(';')[0].substring(1).slice(0, -1)
              );
            }

            setUsers(() => data);
          } else {
            setError(() => true);
          }
        } catch (err) {
          console.log(err);
          setError(() => true);
        }
      })();
    } else {
      setUsers(() => JSON.parse(storedData));
    }
  }, []);

  return (
    <div className='main-wrapper'>
      {/* Search bar from insomnia designer */}
      <div className='search-container'>
        <input
          value={searchTerm}
          placeholder='Search for github users'
          onChange={(e) => search(e.target.value)}
          onFocus={() => setIsSearching(() => true)}
          onBlur={() => setIsSearching(() => false)}
        />
      </div>
      {results.length === 0 || error ? (
        <div className='info-display-container'>
          {error ? <Error /> : <Spinner />}
        </div>
      ) : (
        <div className='infinite-scroll-container'>
          <div>
            {results.map((user, idx) => {
              const key = idx;
              return (
                <Link key={key} to={`/${user.username}`}>
                  <div className='user-card-main'>
                    <UserCard
                      username={user.username}
                      avatarURL={user.avatarURL}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
          {(!infiniteScrollError || thatsItFolks) && !isSearching && (
            <div
              className='infinite-scroll-loading-element'
              ref={loadingElementRef}>
              <Spinner />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Main;
