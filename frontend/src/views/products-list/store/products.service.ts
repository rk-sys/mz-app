import axios from 'axios';

export async function getProducts() {
  return axios.get('https://api.myjson.com/bins/o320k');
}
