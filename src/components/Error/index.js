import React from 'react';
import { ReactComponent as WarningIcon } from '../../assets/svg/warning.svg';
import { ERROR_MESSAGE } from '../../utils/Constants';

function Error() {
  return (
    <>
      <WarningIcon
        style={{ height: '48px', width: '48px', marginBottom: '16px' }}
      />
      <div>{ERROR_MESSAGE}</div>
    </>
  );
}

export default Error;
