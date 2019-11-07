import { IResetPassword } from '@/views/reset-password/reset-password.interface';

export const mzResetPasswordState: IResetPassword = {
  resetPasswordForm: {
    email: '',
  },
  resetPasswordFormErrors: {
    email: false,
  },
  icons: [
    {
      icon: 'icon-wooden',
      style: {
        top: '8rem',
        left: '-11rem',
      },
    },
    {
      icon: 'icon-leather',
      style: {
        top: '19rem',
        left: '-18rem',
      },
    },
    {
      icon: 'icon-wool',
      style: {
        top: '30rem',
        left: '-9rem',
        padding: '3rem',
      },
    },
    {
      icon: 'icon-wooden',
      style: {
        top: '-6rem',
        left: '44rem',
        padding: '4rem',
      },
    },
    {
      icon: 'icon-anvil',
      style: {
        top: '7rem',
        left: '50rem',
      },
    },
    {
      icon: 'icon-wool',
      style: {
        top: '17rem',
        left: '46rem',
        height: '4rem',
        width: '4rem',
      },
    },
  ],
};
