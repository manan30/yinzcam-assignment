import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFollowers, fetchReposURL } from '../../api/index';
import { RepoCard, UserCard } from '../../components/Card';
import Tabs from '../../components/Tabs';
import dummyFollowers from '../../followers.json';
import useFetch from '../../hooks/useFetch';
import { useDetailsStore } from '../../store/DetailsStore';
import './index.css';
import { ERROR_MESSAGE } from '../../utils/Constants';
import { ReactComponent as WarningIcon } from '../../assets/svg/warning.svg';

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

  if (
    (type === 'repos' && repos.error && repos.data.length === 0) ||
    (type === 'followers' && followers.error && followers.data.length === 0)
  ) {
    return (
      <div className='info-display-container'>
        <WarningIcon
          style={{ height: '48px', width: '48px', marginBottom: '16px' }}
        />
        <div>{ERROR_MESSAGE}</div>
      </div>
    );
  }

  if (
    (type === 'repos' && !repos.error && !repos.fetched) ||
    (type === 'followers' && !followers.error && !followers.fetched)
  ) {
    return <div className='info-display-container' />;
  }

  if (
    (type === 'repos' &&
      !repos.error &&
      repos.fetched &&
      repos.data.length === 0) ||
    (type === 'followers' &&
      !followers.error &&
      followers.fetched &&
      followers.data.length === 0)
  ) {
    return (
      <div className='info-display-container'>
        <div>This user has no {type}.</div>
      </div>
    );
  }

  if (type === 'repos') {
    return (
      <div className='tab-content-container'>
        {repos.data.map((obj, idx) => {
          const key = idx;
          return <RepoCard key={key} {...obj} />;
        })}
      </div>
    );
  }

  return <div />;
}

function Details() {
  const { name } = useParams();
  const { dispatch } = useDetailsStore();
  const { data, error } = useFetch(fetchReposURL(name));

  useEffect(() => {
    if (data) {
      dispatch({ type: 'SET_REPOS', data });
    }

    if (error) {
      dispatch({ type: 'SET_REPOS_ERROR' });
    }
  }, [dispatch, data, error]);

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
