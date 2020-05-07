import React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as ForkIcon } from '../../assets/svg/repo-forked.svg';
import { ReactComponent as StarIcon } from '../../assets/svg/star.svg';
import { ReactComponent as WatchIcon } from '../../assets/svg/watch.svg';
import { ReactComponent as IssueIcon } from '../../assets/svg/issue-opened.svg';
import useCSSVariables from '../../hooks/useCSSVariables';

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
  const { elementRef } = useCSSVariables();

  return (
    <div className='repos-card'>
      <a href={htmlURL} target='blank' className=''>
        {name}
      </a>
      <div className='repos-card-description'>{description}</div>
      <div className='flex-container'>
        {language && (
          <div
            ref={elementRef}
            style={{ display: 'flex', alignItems: 'center', flex: 'auto 2 2' }}>
            <div className='language-color' />
            <div className='counts-text'>{language}</div>
          </div>
        )}

        <div style={{ display: 'flex' }}>
          {forksCount > 0 && (
            <div className='flex-container' style={{ marginRight: '10px' }}>
              <ForkIcon className='svg' />
              <div className='counts-text'>{forksCount}</div>
            </div>
          )}

          {stargazersCount > 0 && (
            <div className='flex-container' style={{ marginRight: '10px' }}>
              <StarIcon className='svg' />
              <div className='counts-text'>{stargazersCount}</div>
            </div>
          )}

          {watchersCount > 0 && (
            <div className='flex-container' style={{ marginRight: '10px' }}>
              <WatchIcon className='svg' />
              <div className='counts-text'>{watchersCount}</div>
            </div>
          )}

          {issuesCount > 0 && (
            <div className='flex-container'>
              <IssueIcon className='svg' />
              <div className='counts-text'>{issuesCount}</div>
            </div>
          )}
        </div>
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
