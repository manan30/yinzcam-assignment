import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRepositories, fetchFollowers } from '../../api/index';
import { RepoCard, UserCard } from '../../components/Card';
import Tabs from '../../components/Tabs';
import { useDetailsStore } from '../../store/DetailsStore';
import './index.css';
import dummyRepos from '../../repos.json';
import dummyFollowers from '../../followers.json';

function TabDataComponent({ type, name }) {
  const {
    state: { repos, followers },
    dispatch,
  } = useDetailsStore();

  useEffect(() => {
    if (type === 'followers' && followers.length === 0) {
      (async function getFollower() {
        try {
          const userFollowers = await (await fetchFollowers(name)).json();

          if (userFollowers instanceof Array) {
            dispatch({ type: 'SET_FOLLOWERS', data: userFollowers });
          }
        } catch (err) {
          dispatch({ type: 'SET_FOLLOWERS', data: dummyFollowers });
          console.log(err);
        }
      })();
    }
  });

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
        const repos = await (await fetchRepositories(name)).json();

        if (repos instanceof Array) {
          dispatch({ type: 'SET_REPOS', data: repos });
        }
      } catch (err) {
        dispatch({ type: 'SET_REPOS', data: dummyRepos });
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
              component: <TabDataComponent type='followers' name={name} />,
            },
          ]}
        />
      </div>
    </div>
  );
}

TabDataComponent.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
};

TabDataComponent.defaultProps = {
  type: '',
  name: '',
};

export default Details;
