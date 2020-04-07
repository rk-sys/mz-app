import axios        from 'axios';
import { IProduct } from '@/views/products-list/store/products.interface';

export function getCraftsmenDetail(payload: string): Promise<any> {
  return axios.get('http://localhost:3000/craftsmanDetail');
}
