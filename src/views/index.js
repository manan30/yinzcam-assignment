import React from 'react';
import { DetailsProvider } from '../store/DetailsStore';
import Details from './Details';
import MainView from './Main';

const DetailsView = () => {
  return (
    <DetailsProvider>
      <Details />
    </DetailsProvider>
  );
};

export { MainView, DetailsView };
