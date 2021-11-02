import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface SignupCredentials {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  age: number;
}

export interface SigninCredentials {
  email: string;
  password: string;
}

export interface SignUpResponse {
  message: string;
}

interface SigninResponse {
  message: string;
  token?: string;
  user?: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    age: number;
  };
}

interface signoutResponse {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://routeegypt.herokuapp.com';
  signedin$ = new BehaviorSubject(null);
  userToken = '';
  citizenID = '';

  constructor(private http: HttpClient) {}

  signup(crefentials: SignupCredentials) {
    return this.http
      .post<SignUpResponse>(`${this.baseUrl}/signup`, crefentials)
      .pipe(
        tap(({ message }) => {
          if (message === 'success') {
            this.signedin$.next(true);
          }
        })
      );
  }

  signin(credentials: SigninCredentials) {
    return this.http
      .post<SigninResponse>(`${this.baseUrl}/signin`, credentials)
      .pipe(
        tap(({ message, token, user }) => {
          if (message === 'success') {
            this.signedin$.next(true);
            this.citizenID = user._id;
            this.userToken = token;
          }
        })
      );
  }

  signout(token: string) {
    return this.http
      .post<signoutResponse>(`${this.baseUrl}/signOut`, {
        token,
      })
      .pipe(
        tap(() => {
          this.signedin$.next(false);
        })
      );
  }
}
