import axios from 'axios';

export function getCraftsmenDetail(payload: string) {
  return axios.get('https://api.myjson.com/bins/18jj4i');
}
