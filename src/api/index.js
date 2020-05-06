const BASE_URL = 'https://api.github.com';

export async function fetchUsers(seed) {
  return fetch(`${BASE_URL}/users?since=${seed}`, {
    mode: 'cors',
  });
}

export async function fetchRepositories(user) {
  return fetch(`${BASE_URL}/users/${user}/repos`, {
    mode: 'cors',
  });
}

export async function fetchFollowers(user) {
  return fetch(`${BASE_URL}/users/${user}/followerss`, {
    mode: 'cors',
  });
}
