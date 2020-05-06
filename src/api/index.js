const BASE_URL = 'https://api.github.com';

export async function fetchUsers(seed) {
  return fetch(`${BASE_URL}/users?since=${seed}`, {
    mode: 'cors',
  });
}

export async function fetchDetails() {
  return '';
}
