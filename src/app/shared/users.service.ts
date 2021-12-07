import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncValidatorFn } from '@angular/forms';
import { Subject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private UrlBase: string = 'http://localhost:8080/api/'
  usersChanged: Subject<any> = new Subject();

  constructor(private http: HttpClient) {}

  getUsers(){
    return this.http.get<User[]>(this.UrlBase + 'users');
  }

  checkUsernameAvailability(username: string){
    return this.http.get<boolean>(this.UrlBase + "users/" + username + "/check-username-availability")
  }

  createUser(user: User){
    console.log(user);
    return this.http.post<User>(this.UrlBase + "users", user);
  }

  editUserExcludePassword(username: string, user: object){
    if(user.hasOwnProperty('password'))
      user['password'] = null;
    return this.http.patch<User>(this.UrlBase + "users/" + username, user);
  }

  deleteUser(username: string){
    return this.http.delete(this.UrlBase + "users/" + username);
  }

  changeUserPassword(username: string, newPassword: string){
    return this.http.post(this.UrlBase + 'users/' + username + '/change-password', newPassword);
  }

  emitUsersChanged(){
    this.usersChanged.next();
  }

}
