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
export class JwtInterceptor implements HttpInterceptor{

    constructor(private usersService: UsersService, private http: HttpClient, private router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.url.endsWith('refresh-token')){
            return next.handle(req);
        }
        if(this.usersService.isLoggedIn()){
            return next.handle(req.clone(
                { headers: req.headers.append('Authorization', 'Bearer ' + localStorage.getItem('forum_access_token')) }
            ))
        }
        else
            return next.handle(req);
    }
}