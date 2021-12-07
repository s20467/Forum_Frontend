import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit {

  username: string;

  passwordChangeForm: FormGroup;

  constructor(private route: ActivatedRoute, private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.params['username'];
    this.passwordChangeForm = new FormGroup({
      'new-password': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      'new-password-repeat': new FormControl(null)
    }, this.passwordRepeatMatchValidator);
  }

  onSubmit(){
    if(this.passwordChangeForm.valid){
      this.usersService.changeUserPassword(this.username, this.passwordChangeForm.value['new-password']).subscribe(() => {
        this.usersService.emitUsersChanged();
        this.router.navigate(['../../list'], {relativeTo: this.route});
      })
    }
  }

  passwordRepeatMatchValidator(group: FormGroup): ValidationErrors{
    if(group.controls['new-password'].value !== group.controls['new-password-repeat'].value){
      group.controls['new-password-repeat'].setErrors({passwordRepeatMatch: true});
      return {passwordRepeatMatch: true};
    }
    return null;
  }

}
