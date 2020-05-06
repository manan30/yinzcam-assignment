import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRepositories, fetchFollowers } from '../api/index';

function Details() {
  const { name } = useParams();
  const [repositories, setRepositories] = useState([]);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    (async function getDetails() {
      try {
        const [repos, userFollowers] = await Promise.all([
          await (await fetchRepositories(name)).json(),
          await (await fetchFollowers(name)).json(),
        ]);

        if (repos instanceof Array) {
          setRepositories(() => repos);
        }

        if (userFollowers instanceof Array) {
          setFollowers(() => userFollowers);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [name]);

  return <div />;
}

export default Details;
