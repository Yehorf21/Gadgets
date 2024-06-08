import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://gadgets-production.up.railway.app/',
});

interface User {
  email: string;
  password: string;
}

export const create = (body: User) => {
  return instance.post('users', body, { withCredentials: true });
};
