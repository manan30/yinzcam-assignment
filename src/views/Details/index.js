import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFollowers, fetchRepositories } from '../../api/index';
import { RepoCard, UserCard } from '../../components/Card';
import Tabs from '../../components/Tabs';
import dummyFollowers from '../../followers.json';
import { useDetailsStore } from '../../store/DetailsStore';
import './index.css';

function TabDataComponent({ type }) {
  const {
    state: { repos, followers },
  } = useDetailsStore();

  return (
    <div className='tab-content-container'>
      {type === 'followers'
        ? followers.map((obj, idx) => {
            const key = idx;
            return <UserCard key={key} {...obj} />;
          })
        : repos.map((obj, idx) => {
            const key = idx;
            return <RepoCard key={key} {...obj} />;
          })}
    </div>
  );
}

function Details() {
  const { name } = useParams();

  const { dispatch } = useDetailsStore();

  useEffect(() => {
    (async function getDetails() {
      try {
        const [repos, userFollowers] = await Promise.all([
          await (await fetchRepositories(name)).json(),
          await (await fetchFollowers(name)).json(),
        ]);

        if (repos instanceof Array) {
          dispatch({ type: 'SET_REPOS', data: repos });
        }

        if (userFollowers instanceof Array) {
          dispatch({ type: 'SET_FOLLOWERS', data: userFollowers });
        }
      } catch (err) {
        dispatch({ type: 'SET_FOLLOWERS', data: dummyFollowers });
        console.log(err);
      }
    })();
  }, [name, dispatch]);

  return (
    <div className='details-container'>
      <h2 className='details-header'>User details for {name} </h2>
      <div className='details-tabs-container'>
        <Tabs
          tabs={[
            {
              tag: 'Repositories',
              component: <TabDataComponent type='repos' />,
            },
            {
              tag: 'Followers',
              component: <TabDataComponent type='followers' />,
            },
          ]}
        />
      </div>
    </div>
  );
}

TabDataComponent.propTypes = {
  type: PropTypes.string,
};

TabDataComponent.defaultProps = {
  type: '',
};

export default Details;
