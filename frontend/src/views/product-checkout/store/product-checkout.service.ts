import axios from 'axios';

export function getProductCheckout(payload: string): Promise<any> {
  return axios.get('http://localhost:3000/productCheckout');
}
