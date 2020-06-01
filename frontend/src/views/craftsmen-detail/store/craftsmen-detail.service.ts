import axios from 'axios';

export function getCraftsmenDetail(payload: string): Promise<any> {
  return axios.get('http://localhost:3000/craftsmanDetail');
}
