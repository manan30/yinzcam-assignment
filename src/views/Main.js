import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../api';
import UserCard from '../components/UserCard';

function Main() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async function getUsers() {
      try {
        const data = await (await fetchUsers(15)).json();
        setUsers(() => data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className='main-wrapper'>
      <div className='search-container' />
      {users.length === 0 ? (
        <div> Loading...</div>
      ) : (
        <div className='infinite-scroll-container'>
          {users.map((user, idx) => {
            const key = idx;
            return (
              <UserCard
                key={key}
                username={user.login}
                avatarUrl={user.avatar_url}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Main;
