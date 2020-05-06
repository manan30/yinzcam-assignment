import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRepositories, fetchFollowers } from '../../api/index';
import Tabs from '../../components/Tabs';
import './details.css';

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

  return (
    <div className='details-container'>
      <h2 className='details-header'>User details for {name} </h2>
      <div className='details-tabs-container'>
        <Tabs
          tabs={[
            {
              tag: 'Repositories',
              component: <div style={{ background: 'blue' }} />,
            },
            {
              tag: 'Followers',
              component: <div style={{ background: 'green' }} />,
            },
          ]}
        />
      </div>
    </div>
  );
}

export default Details;
