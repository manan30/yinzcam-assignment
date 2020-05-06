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
      } catch (e) {
        setUsers(() => []);
      }
    })();
  }, []);

  return users.length === 0 ? (
    <div> Loading...</div>
  ) : (
    <>
      {users.map((user, idx) => {
        const key = idx;
        return (
          <Link key={key} to={`/${user.login}`}>
            <div>
              <img src={user.avatar_url} alt={`${user.login}'s profile`} />
              <span>{user.login}</span>
            </div>
          </Link>
        );
      })}
    </>
  );
}

export default Main;
