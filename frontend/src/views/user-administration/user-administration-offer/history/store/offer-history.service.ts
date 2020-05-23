import axios from 'axios';

export function getUserOffers() {
  return axios.get('http://localhost:3000/userAccountOffersHistory');
}
