const BASE_URL = 'https://api.github.com';

export async function fetchUsers(seed) {
  return fetch(`${BASE_URL}/users?since=${seed}`, {
    mode: 'cors',
  });
}

export const fetchReposURL = (user) => `${BASE_URL}/users/${user}/repos`;

export const fetchFollowersURL = (user) =>
  `${BASE_URL}/users/${user}/followers`;

// export async function fetchFollowers(user) {
//   return fetch(`${BASE_URL}/users/${user}/followers`, {
//     mode: 'cors',
//   });
// }
