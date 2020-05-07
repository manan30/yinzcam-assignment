export const ERROR_MESSAGE =
  'There was an error in fetching the data. Please try again in some time.';

export const GITHUB_URL = (user) => `https://github.com/${user}`;

export const FUSE_OPTIONS = {
  shouldSort: true,
  threshold: 0.4,
  location: 0,
  distance: 50,
  maxPatternLength: 12,
  minMatchCharLength: 3,
  keys: ['username'],
};
