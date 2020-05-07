import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { fetchFollowersURL, fetchReposURL } from '../../api/index';
import { ReactComponent as BackButton } from '../../assets/svg/back-button.svg';
import { RepoCard, UserCard } from '../../components/Card';
import Error from '../../components/Error';
import Spinner from '../../components/Spinner';
import Tabs from '../../components/Tabs';
import useFetch from '../../hooks/useFetch';
import { useDetailsStore } from '../../store/DetailsStore';
import { GITHUB_URL } from '../../utils/Constants';
import './index.css';


function TabDataComponent({ type, name }) {
  const {
    state: { repos, followers },
    dispatch,
  } = useDetailsStore();
  const { data, error } = useFetch(
    type === 'repos' ? fetchReposURL(name) : fetchFollowersURL(name),
    type
  );

  useEffect(() => {
    if (type === 'repos') {
      if (data) {
        dispatch({ type: 'SET_REPOS', data });
      }

      if (error) {
        dispatch({ type: 'SET_REPOS_ERROR' });
      }
    } else {
      if (data) {
        dispatch({ type: 'SET_FOLLOWERS', data });
      }

      if (error) {
        dispatch({ type: 'SET_FOLLOWERS_ERROR' });
      }
    }
  }, [dispatch, data, error, name, type]);

  if (
    (type === 'repos' && repos.error && repos.data.length === 0) ||
    (type === 'followers' && followers.error && followers.data.length === 0)
  ) {
    return (
      <div className='info-display-container'>
        <Error />
      </div>
    );
  }

  if (
    (type === 'repos' && !repos.error && !repos.fetched) ||
    (type === 'followers' && !followers.error && !followers.fetched)
  ) {
    return (
      <div className='info-display-container'>
        <Spinner />
      </div>
    );
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

  return (
    <div className='tab-content-container'>
      {type === 'repos'
        ? repos.data.map((obj, idx) => {
            const key = idx;
            return <RepoCard key={key} {...obj} />;
          })
        : followers.data.map((obj, idx) => {
            const key = idx;
            return <UserCard key={key} {...obj} />;
          })}
    </div>
  );
}

function Details() {
  const { name } = useParams();
  const history = useHistory();

  return (
    <div className='details-container'>
      <div className='details-header'>
        <BackButton
          onClick={() => {
            history.goBack();
          }}
        />
        <a
          style={{ marginLeft: 'auto' }}
          href={GITHUB_URL(name)}
          target='blank'>
          {name}&apos;s GitHub Profile{' '}
        </a>
      </div>
      <div className='details-tabs-container'>
        <Tabs
          tabs={[
            {
              tag: 'Repositories',
              component: <TabDataComponent type='repos' name={name} />,
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
