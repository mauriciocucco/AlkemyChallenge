import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  Auth,
  Login,
  RegisterForm,
  RegisterResponse,
} from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.urlServer}/users`;
  private _auth: Auth | undefined;
  get user() {
    return this._auth?.user;
  }

  constructor(private http: HttpClient) {}

  verifyAuthentication(): Observable<boolean> {
    return !localStorage.getItem('token') ? of(false) : of(true);
  }

  login(formValues: Login) {
    return this.http.post<Auth>(`${this.baseUrl}/login`, formValues).pipe(
      tap((auth) => (this._auth = auth)),
      tap((auth) => localStorage.setItem('token', JSON.stringify(auth.token)))
    );
  }

  logout() {
    this._auth = undefined;
  }

  register(formValues: RegisterForm) {
    return this.http.post<RegisterResponse>(
      `${this.baseUrl}/register`,
      formValues
    );
  }
}
