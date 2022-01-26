import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncValidatorFn } from '@angular/forms';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import jwt_decode from 'jwt-decode'
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

interface AuthTokensResponse{
  access_token: string;
  refresh_token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private UrlBase: string = environment.apiUrlBase;
  usersChanged: Subject<any> = new Subject();
  authenticationStatusChanged: Subject<boolean> = new Subject();

  currentUser: User;

  constructor(private http: HttpClient, private router: Router) {
    let access_token: string = localStorage.getItem('forum_access_token');
    if(access_token){
      let decodedJwt = jwt_decode(access_token);
      this.currentUser = new User();
      this.currentUser.username = decodedJwt['sub'];
      this.currentUser.authorities = decodedJwt['authorities'];
      this.emitAuthenticationStatusChanged();
    }
  }

  getUsers(){
    return this.http.get<User[]>(this.UrlBase + 'api/users');
  }

  checkUsernameAvailability(username: string){
    return this.http.get<boolean>(this.UrlBase + "api/users/" + username + "/check-username-availability")
  }

  createUser(user: User){
    console.log(user);
    return this.http.post<User>(this.UrlBase + "api/users/create", user);
  }

  editUserExcludePassword(username: string, user: object){
    if(user.hasOwnProperty('password'))
      user['password'] = null;
    return this.http.patch<User>(this.UrlBase + "api/users/" + username, user);
  }

  deleteUser(username: string){
    return this.http.delete(this.UrlBase + "api/users/" + username);
  }

  changeUserPassword(username: string, newPassword: string){
    return this.http.post(this.UrlBase + 'api/users/' + username + '/change-password', {'password': newPassword});
  }

  emitUsersChanged(){
    this.usersChanged.next();
  }


  login(username: string, password: string){
    return this.http.post<AuthTokensResponse>(this.UrlBase + 'login', {username: username, password: password})
    .pipe(tap((response: AuthTokensResponse) => {
      localStorage.setItem("forum_access_token", response.access_token);
      localStorage.setItem("forum_refresh_token", response.refresh_token);
      let decodedJwt = jwt_decode(response.access_token);
      this.currentUser = new User();
      this.currentUser.username = decodedJwt['sub'];
      this.currentUser.authorities = decodedJwt['authorities'];
      this.emitAuthenticationStatusChanged();
    }));
  }

  logout(){
    this.currentUser = null;
    localStorage.removeItem("forum_access_token");
    localStorage.removeItem("forum_refresh_token");
    this.emitAuthenticationStatusChanged();
    this.router.navigate(['/'])
  }

  isLoggedIn(){
    return !!this.currentUser;
  }

  isAdmin(){
    return this.isLoggedIn() && (this.currentUser.authorities.includes('ROLE_ADMIN'));
  }

  emitAuthenticationStatusChanged(){
    this.authenticationStatusChanged.next(!!this.currentUser);
  }

}
