export interface Login {
  email: string;
  password: string;
}

export interface RegisterForm {
  nombre_completo: string;
  email: string;
  password: string;
  confirm_password: string;
  saldo: number;
}

export interface RegisterResponse {
  id: number;
}

export interface Auth {
  token: string;
  message: string;
  user: string;
}

export interface EmailValidation {
  message: string;
}
