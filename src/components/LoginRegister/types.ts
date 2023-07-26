export interface ILoginRegister {
  type: 'login' | 'register';
  description: string;
}

export interface ILoginSubmitValues {
  email: string;
  password: string;
}

export interface IRegisterSubmitValues {
  email: string;
  password: string;
  name: string;
  phoneNumber: number;
  confirmPassword?: string;
}
