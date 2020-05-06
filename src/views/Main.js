import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../api';

function Main() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async function getUsers() {
      try {
        const data = await (await fetchUsers(15)).json();
        console.log(data);
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
              <Link key={key} to={`/${user.login}`} className='user-card'>
                <img
                  className='user-profile-image'
                  src={user.avatar_url}
                  alt={`${user.login}'s profile`}
                />
                <span>{user.login}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Main;
