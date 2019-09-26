import firebase from 'firebase/app';
import 'firebase/auth';

export function getCurrentLoginUser() {
  return firebase.auth().currentUser;
}
