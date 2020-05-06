import PropTypes from 'prop-types';
import React from 'react';

function UserCard({ username, avatarUrl }) {
  return (
    <>
      <img
        className='user-profile-image'
        src={avatarUrl}
        alt={`${username}'s avatar`}
      />
      <span>{username}</span>
    </>
  );
}

UserCard.propTypes = {
  username: PropTypes.string,
  avatarUrl: PropTypes.string,
};

UserCard.defaultProps = {
  username: '',
  avatarUrl: '',
};

export default UserCard;
