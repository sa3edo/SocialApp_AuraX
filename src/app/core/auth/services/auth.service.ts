import { register } from 'module';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appAPIs } from '../../constants/appAPIs';
import { IRegisterResponse } from '../interface/IRegisterResponse';
import { ILoginResponse } from '../interface/ILoginResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  register(userData: FormData) {
    return this.http.post<IRegisterResponse>(appAPIs.register, userData);
  }
  login(userData: FormData) {
    return this.http.post<ILoginResponse>(appAPIs.login, userData);
  }
}
