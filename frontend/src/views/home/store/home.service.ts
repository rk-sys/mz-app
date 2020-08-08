import axios from 'axios';

export async function getHomeData() {
  return axios.get('http://localhost:3000/home');
}
