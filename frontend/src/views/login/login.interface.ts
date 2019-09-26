export interface ILogin {
  loginForm: ILoginForm;
  icons: IIcon[];
  errorLoginForm: boolean;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IIcon {
  icon: string;
  style: IIconStyle;
}

export interface IIconStyle {
  top: string;
  left: string;
  width?: string;
  height?: string;
}
