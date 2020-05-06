import PropTypes from 'prop-types';
import React from 'react';

function UserCard({ username, avatarURL }) {
  return (
    <div className='user-card'>
      <img
        className='user-profile-image'
        src={avatarURL}
        alt={`${username}'s avatar`}
      />
      <span>{username}</span>
    </div>
  );
}

UserCard.propTypes = {
  username: PropTypes.string,
  avatarURL: PropTypes.string,
};

UserCard.defaultProps = {
  username: '',
  avatarURL: '',
};

export default UserCard;
