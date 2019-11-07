export interface IResetPassword {
  resetPasswordForm: IResetPasswordForm,
  resetPasswordFormErrors: IFieldFormError,
  icons: IIcon[];
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
  padding?: string;
}

export interface IFieldFormError {
  email: boolean;
}

export interface IResetPasswordForm {
  email: string;
}
