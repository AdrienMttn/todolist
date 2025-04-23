import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { result } from '../models/result';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class ApiUserService {
  private http = inject(HttpClient);
  readonly url = 'https://todolist.x10.mx/api/account/';
  private unUser!: user | undefined;

  createAccount(
    username: string | undefined | null,
    email: string | undefined | null,
    password: string | undefined | null
  ) {
    return this.http.post<result>(`${this.url}createAccount.php`, {
      username: username,
      email: email,
      password: password,
    });
  }

  login(email: string | undefined | null, password: string | undefined | null) {
    return this.http.post<result>(
      `${this.url}login.php`,
      {
        email: email,
        password: password,
      },
      { withCredentials: true }
    );
  }

  logout() {
    this.http
      .get(`${this.url}logout.php`, { withCredentials: true })
      .subscribe();
    this.unUser = undefined;
  }

  setUser() {
    this.http
      .get<user>(`${this.url}getUser.php`, {
        withCredentials: true,
      })
      .subscribe((data) => {
        if ('status' in data && 'message' in data) {
          this.unUser = undefined;
        } else {
          this.unUser = data;
        }
      });
  }

  getUser() {
    return this.unUser;
  }
}
