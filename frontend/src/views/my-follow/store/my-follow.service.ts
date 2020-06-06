import axios from 'axios';

export function getMyFollow() {
  return axios.get('http://localhost:3000/myFollow');
}
