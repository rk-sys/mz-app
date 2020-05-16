import axios, { AxiosPromise } from 'axios';

export function getOffers(): AxiosPromise {
  return axios.get('http://localhost:3000/offers');
}
