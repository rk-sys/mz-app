import axios from 'axios';

export function getCraftsmenDetail(payload: string): Promise<any> {
  return axios.get('https://api.myjson.com/bins/18jj4i');
}

export function getCraftsmenCommentsAndRating(payload: string): Promise<any> {
  return axios.get('https://api.myjson.com/bins/756m4');
}
