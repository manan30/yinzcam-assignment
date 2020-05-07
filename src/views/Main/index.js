import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../../api';
import { UserCard } from '../../components/Card';
import Spinner from '../../components/Spinner';
import Error from '../../components/Error';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import './index.css';

function Main() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const { details, loadingElementRef } = useInfiniteScroll(users);

  useEffect(() => {
    const storedData = sessionStorage.getItem('users');
    if (!storedData) {
      (async function getUsers() {
        try {
          const response = await fetchUsers(15);

          if (response.ok) {
            const data = await response.json();
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
      <div className='search-container' />
      {details.length === 0 || error ? (
        <div className='info-display-container'>
          {error ? <Error /> : <Spinner />}
        </div>
      ) : (
        <div className='infinite-scroll-container'>
          <div>
            {details.map((user, idx) => {
              const key = idx;
              return (
                <Link key={key} to={`/${user.login}`}>
                  <div className='user-card-main'>
                    <UserCard
                      username={user.login}
                      avatarURL={user.avatar_url}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
          <div
            className='infinite-scroll-loading-element'
            ref={loadingElementRef}>
            <Spinner />
          </div>
        </div>
      )}
    </div>
  );
}

export default Main;
