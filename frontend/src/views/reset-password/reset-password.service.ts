import { IResetPasswordForm } from './reset-password.interface';
import firebase               from 'firebase/app';
import 'firebase/auth';

export function sendPasswordResetEmail(payload: IResetPasswordForm): Promise<any> {
  return firebase.auth().sendPasswordResetEmail(payload.email);

}
