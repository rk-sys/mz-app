import axios from 'axios';

export function getOfferDetail(payload: string): Promise<any> {
  return axios.get('http://localhost:3000/offerDetail');
}
