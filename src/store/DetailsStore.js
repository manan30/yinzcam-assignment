import React, { useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  repos: { data: [], error: false },
  followers: { data: [], error: false },
};

const DetailsContext = React.createContext();

const detailsReducer = (state, action) => {
  let data;
  let newState;

  switch (action.type) {
    case 'SET_REPOS':
      data = action.data.map(
        ({
          name,
          html_url: htmlURL,
          description,
          language,
          forks_count: forksCount,
          stargazers_count: stargazersCount,
          watchers_count: watchersCount,
          issues_count: issuesCount,
        }) => ({
          name,
          htmlURL,
          description,
          language,
          forksCount,
          stargazersCount,
          watchersCount,
          issuesCount,
        })
      );
      newState = { data, error: false };
      return { ...state, repos: newState };
    case 'SET_FOLLOWERS':
      data = action.data.map(({ login: username, avatar_url: avatarURL }) => ({
        username,
        avatarURL,
      }));
      newState = { data, error: false };
      return { ...state, followers: newState };
    case 'SET_FOLLOWERS_ERROR':
      newState = { ...state.followers, error: true };
      return { ...state, followers: newState };
    case 'SET_REPOS_ERROR':
      newState = { ...state.repos, error: true };
      return { ...state, repos: newState };
    default:
      console.log('No corresponding action found');
      return state;
  }
};

export function DetailsProvider({ children }) {
  const [state, dispatch] = useReducer(detailsReducer, initialState);

  return (
    <DetailsContext.Provider value={{ state, dispatch }}>
      {children}
    </DetailsContext.Provider>
  );
}

DetailsProvider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any),
};

DetailsProvider.defaultProps = {
  children: {},
};

export const useDetailsStore = () => useContext(DetailsContext);
