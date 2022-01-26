import { HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse, HttpStatusCode } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, retry, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { UsersService } from "./users.service";


interface AccessTokenResponse{
    access_token: string;
}

@Injectable({
    providedIn: 'root'
})
export class JwtRefreshInterceptor implements HttpInterceptor{

    constructor(private usersService: UsersService, private http: HttpClient, private router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(this.usersService.isLoggedIn())
            return next.handle(req).pipe(
                tap(
                    () => {},
                    (error: HttpErrorResponse) => {
                        if(error.status == 401){
                            this.http.get<AccessTokenResponse>(environment.apiUrlBase + 'api/refresh-token', {headers: new HttpHeaders({'Authorization': 'Bearer ' + localStorage.getItem('forum_refresh_token')})})
                                .subscribe((response: AccessTokenResponse) => {
                                    localStorage.setItem('forum_access_token', response.access_token);
                                    return next.handle(req);////////////
                                },
                                (error) => {
                                    this.usersService.logout();
                                    this.router.navigate(['users', 'login']);
                                    return;
                                })
                        }
                    })
            );
        else
            return next.handle(req);
    }
}