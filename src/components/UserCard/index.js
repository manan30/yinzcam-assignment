import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function UserCard({ username, avatarUrl }) {
  return (
    <Link to={`/${username}`} className='user-card'>
      <img
        className='user-profile-image'
        src={avatarUrl}
        alt={`${username}'s profile`}
      />
      <span>{username}</span>
    </Link>
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
