import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFollowers, fetchRepositories } from '../../api/index';
import { RepoCard, UserCard } from '../../components/Card';
import Tabs from '../../components/Tabs';
import './index.css';

function TabDataComponent({ type, data }) {
  return (
    <div className='tab-data-component'>
      {type === 'followers'
        ? data.map((obj) => <UserCard {...obj} />)
        : data.map((obj) => <RepoCard {...obj} />)}
    </div>
  );
}

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
              component: <TabDataComponent type='repos' data={repositories} />,
            },
            {
              tag: 'Followers',
              component: <TabDataComponent type='followers' data={followers} />,
            },
          ]}
        />
      </div>
    </div>
  );
}

TabDataComponent.propTypes = {
  type: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.any),
};

TabDataComponent.defaultProps = {
  type: '',
  data: [],
};

export default Details;
