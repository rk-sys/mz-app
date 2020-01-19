import axios from 'axios';

export async function getCraftsmen() {
  return axios.get('https://api.myjson.com/bins/wo4ju');
}
