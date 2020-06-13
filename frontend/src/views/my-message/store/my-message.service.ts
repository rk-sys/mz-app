import axios from 'axios';

export function getMyMessages() {
  return axios.get('http://localhost:3000/myMessages');
}
