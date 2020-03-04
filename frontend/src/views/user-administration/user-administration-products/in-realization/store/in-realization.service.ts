import axios from 'axios';

export function getUserItems() {
  return axios.get('https://api.myjson.com/bins/s8nle');
}
