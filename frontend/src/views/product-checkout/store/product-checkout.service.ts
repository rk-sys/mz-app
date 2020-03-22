import axios from 'axios';

export function getProductCheckout(payload: string): Promise<any> {
  return axios.get('https://api.myjson.com/bins/90he4');
}
