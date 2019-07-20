import {ILogin} from '../login.interface';

export const mzLoginState: ILogin = {
    errorLoginForm: false,
    loginForm: {
        login: '',
        password: '',
    },

    icons: [
        {
            icon: 'icon-anvil',
            style: {
                top: '-10rem',
                left: '-15rem',
            },
        },
        {
            icon: 'icon-leather',
            style: {
                top: '0rem',
                left: '-10rem',
            },
        },
        {
            icon: 'icon-wooden',
            style: {
                top: '20rem',
                left: '50rem',
            },
        },
        {
            icon: 'icon-wool',
            style: {
                top: '30rem',
                left: '45rem',
            },
        },
    ],
};
