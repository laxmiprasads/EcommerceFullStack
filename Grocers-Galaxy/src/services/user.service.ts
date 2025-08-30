import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}
    
  private apiUrl='http://localhost:8080/api/signup';

  private loginUrl='http://localhost:8080/api/login';

  userRole!:string;
  email!:string;
  username!:string;

  setRole(role: string) {
    this.userRole = role;
  }
  getRole(): string {
    return this.userRole;
  }
  setEmail(email: string) {
    this.email = email;
  }
  getEmail(): string {
    return this.email;
  }
  setUsername(username: string) {
    this.username = username;
  }
  getUsername(): string {
    return this.username;
  }
  

  getUser(userdetails:Login): Observable<any> {
    return this.http.post<User>(this.loginUrl, userdetails);
  }

  addUser(user:User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
}
