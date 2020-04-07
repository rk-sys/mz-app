import axios from 'axios';

export async function getCraftsmen() {
  return axios.get('http://localhost:3000/craftsmen');
}
