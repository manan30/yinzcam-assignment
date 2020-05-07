import React from 'react';
import Spinner from '../Spinner';
import './index.css';

function FallbackUI() {
  return (
    <div className='fallback-ui-container'>
      <Spinner />
    </div>
  );
}

export default FallbackUI;
