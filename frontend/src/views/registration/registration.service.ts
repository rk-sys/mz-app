import firebase from 'firebase/app';
import 'firebase/auth';

export function createNewUser(payload: any): Promise<any> {
  return firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password);
}

