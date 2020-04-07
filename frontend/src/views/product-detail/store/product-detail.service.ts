import axios from 'axios';

export function getProductDetail(payload: string): Promise<any> {
  return axios.get('http://localhost:3000/productDetail');
}
