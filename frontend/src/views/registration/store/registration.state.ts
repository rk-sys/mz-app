import { IRegistration } from '@/views/registration/registration.interface';

export const mzRegistrationState: IRegistration = {
  registrationForm: {
    email: '',
    password: '',
    passwordRepeat: '',
    rule: false,
    newsletter: false,
  },
  registrationFormErrors: {
    email: false,
    password: false,
    passwordRepeat: false,
  },
  icons: [
    {
      icon: 'icon-anvil',
      style: {
        top: '-5rem',
        left: '-15rem',
      },
    },
    {
      icon: 'icon-leather',
      style: {
        top: '5rem',
        left: '-10rem',
      },
    },
    {
      icon: 'icon-wooden',
      style: {
        top: '35rem',
        left: '50rem',
      },
    },
    {
      icon: 'icon-wool',
      style: {
        top: '45rem',
        left: '48rem',
      },
    },
  ],
};
