import axios        from 'axios';
import { IProduct } from '@/views/products-list/store/products.interface';

export function getCraftsmenDetail(payload: string): Promise<any> {
  return axios.get('https://api.myjson.com/bins/18jj4i');
}

export function getCraftsmenCommentsAndRating(payload: string): Promise<any> {
  return axios.get('https://api.myjson.com/bins/756m4');
}

export function getCraftsmenProducts(payload: string): Promise<any> {
  return axios.get('https://api.myjson.com/bins/yf7bw');
}
