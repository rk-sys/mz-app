import axios                 from 'axios';
import {ILoginForm} from '@/views/login/login.interface';

export function loginIntoService(payload: any) {
    return axios.put(`http://www.mocky.io/v2/5d45a7593000002f66c5c8dd`, payload);
}
