import axios from 'axios';

export function getProductDetail(payload: string): Promise<any> {
  return axios.get('https://api.myjson.com/bins/saary');
}
