import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IHttpLoginRequest } from '../login/interfaces/IHttpLoginRequest';
import { HttpService } from '../../core/api/http.service';
import { IHttpAuthResponse } from '../interfaces/IHttpAuthResponse';
import { IHttpResponse } from '../../core/api/interfaces/IHttpResponse';
import { IHttpErrorResponse } from 'src/app/core/api/interfaces/IHttpErrorResponse';
import { IHttpRegisterRequest } from '../register/interfaces/IHttpRegisterRequest';
import { JwtService } from './jwt/jwt.service';
import { CacheService } from 'src/app/core/cache/cache.service';
import { ToastService } from 'src/app/components/toast-messages/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string;
  constructor(
    private httpService: HttpService,
    private jwt: JwtService,
    private cacheService: CacheService,
    private toast: ToastService
  ) {}

  login(user: IHttpLoginRequest, remember: boolean = false): Promise<string> {
    return new Promise((resolve, reject) => {
      this.httpService.post('/users/login', user).subscribe(
        (res: IHttpResponse) => {
          if (res.token) {
            this.jwt.setToken(res.token, remember);
            this.toast.blankSuccess(`Welcome back, ${this.jwt.getName()}!`);
            return resolve();
          } else {
            this.toast.error(
              "Sorry, we can't seem to log you in at the moment!"
            );
            reject();
          }
        },
        (error: IHttpErrorResponse) => {
          console.log(error);
          this.toast.error("That's the wrong username or password.");

          reject();
        }
      );
    });
  }

  register(
    user: IHttpRegisterRequest,
    remember: boolean = false
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.httpService.post('users/signup', user).subscribe(
        (res: IHttpResponse) => {
          if (res.token) {
            this.jwt.setToken(res.token, remember);
            this.toast.blankSuccess(
              `Welcome to the crew, ${this.jwt.getName()}`
            );
            return resolve();
          } else {
            reject(true);
          }
        },
        (error: IHttpErrorResponse) => {
          console.log(error);
          this.toast.error('That email address already exists.');
          reject(false);
        }
      );
    });
  }

  isAuthenticated() {
    return this.jwt.isAuthenticated();
  }

  logOut() {
    this.cacheService.clearCache();
    this.jwt.logOut();
  }
}
