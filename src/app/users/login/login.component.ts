import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private usersService: UsersService, private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)])
    });
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.usersService.login(this.loginForm.value['username'], this.loginForm.value['password']).subscribe(() => {
        this.usersService.emitAuthenticationStatusChanged();
        this.location.back();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      })
    }
  }

}
