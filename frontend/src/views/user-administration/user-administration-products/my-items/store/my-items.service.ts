import axios from 'axios';

export function getUserItems() {
  return axios.get('http://localhost:3000/userAccountProducts');
}
