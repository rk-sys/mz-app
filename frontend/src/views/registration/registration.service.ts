import firebase from 'firebase/app';
import 'firebase/auth';
import UserCredential = firebase.auth.UserCredential;

export function createNewUser(payload: any): Promise<any> {
  return firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password);
}

