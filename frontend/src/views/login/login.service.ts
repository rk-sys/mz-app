import { ILoginForm } from './login.interface';
import firebase       from 'firebase/app';
import 'firebase/auth';

export function loginIntoService(payload: ILoginForm): Promise<any> {
  return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password);
}
