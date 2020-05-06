import React, { useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const initialState = { repos: [], followers: [] };

const DetailsContext = React.createContext();

const detailsReducer = (state, action) => {
  let data;
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
      return { ...state, repos: data };
    case 'SET_FOLLOWERS':
      data = action.data.map(({ login: username, avatar_url: avatarURL }) => ({
        username,
        avatarURL,
      }));
      return { ...state, followers: data };
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
