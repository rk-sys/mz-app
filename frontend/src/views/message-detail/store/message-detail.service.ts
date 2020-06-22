import axios from 'axios';

export async function getMessageDetail() {
  return axios.get('http://localhost:3000/messageDetail');
}
