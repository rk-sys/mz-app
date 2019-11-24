import axios    from 'axios';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

export function getCurrentLoginUser() {
  return firebase.auth().currentUser;
}

export function changeUserPassword(payload: string) {
  const user = getCurrentLoginUser();
  if (user !== null) {
    return user.updatePassword(payload);
  }
}

export function updateEmail(payload: string) {
  const user = getCurrentLoginUser();
  if (user !== null) {
    return user.updateEmail(payload);
  }
}

export function updateDisplayName(payload: string) {
  const user = getCurrentLoginUser();
  if (user !== null) {
    return user.updateProfile({ displayName: payload });
  }
}

export function updateUserPicture(payload: any) {
  const user = getCurrentLoginUser();

  if (user !== null) {
    const blobFile = new Blob([ payload.file ], { type: payload.file.type });
    return firebase.storage().ref(`${user.uid}/avatar`).put(blobFile);
  } else {
    return false;
  }
}

export async function getUserPicture() {
  const user = getCurrentLoginUser();

  if (user !== null) {
    const newUserPicture = await firebase.storage().ref(`${user.uid}/avatar`).getDownloadURL();
    await user.updateProfile({ photoURL: newUserPicture });
    return newUserPicture;
  }
}

export function getUserItems() {
  return axios.get('https://api.myjson.com/bins/12f7uy');
}

