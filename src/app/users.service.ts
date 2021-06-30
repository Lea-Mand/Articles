import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  _http!: HttpClient;
  constructor(private http: HttpClient) {
    this._http = http;
  }

  getUserByEmailPassword = (user: User): Observable<User> => {
    let url = "/users/" + user.email + "/" + user.password;
    return this._http.get<User>(url);
  }

  postUserToSrever = (user: User): Observable<User> => {
    return this._http.post<User>("/users", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(user),
    });
  }
}
