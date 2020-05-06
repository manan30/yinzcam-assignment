import React, { useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const initialState = { repos: [], followers: [] };

const DetailsContext = React.createContext();

const detailsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_REPOS':
      return { ...state, repos: action.data };
    case 'SET_FOLLOWERS':
      return { ...state, followers: action.data };
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
