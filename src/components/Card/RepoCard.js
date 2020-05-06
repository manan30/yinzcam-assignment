import React from 'react';
import PropTypes from 'prop-types';

function RepoCard({
  name,
  htmlURL,
  description,
  language,
  forksCount,
  stargazersCount,
  watchersCount,
  issuesCount,
}) {
  return (
    <div>
      <a href={htmlURL} target='blank'>
        {name}
      </a>
      <div>{description}</div>
      <div>
        <div>{language}</div>
        <div>{forksCount}</div>
        <div>{stargazersCount}</div>
        <div>{watchersCount}</div>
        <div>{issuesCount}</div>
      </div>
    </div>
  );
}

RepoCard.propTypes = {
  name: PropTypes.string,
  htmlURL: PropTypes.string,
  description: PropTypes.string,
  language: PropTypes.string,
  forksCount: PropTypes.number,
  stargazersCount: PropTypes.number,
  watchersCount: PropTypes.number,
  issuesCount: PropTypes.number,
};

RepoCard.defaultProps = {
  name: '',
  htmlURL: '',
  description: '',
  language: '',
  forksCount: 0,
  stargazersCount: 0,
  watchersCount: 0,
  issuesCount: 0,
};

export default RepoCard;
