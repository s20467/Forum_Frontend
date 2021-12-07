import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/user.model';
import { usernameUsedValidator } from 'src/app/shared/username.validators';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  userCreateForm: FormGroup;

  constructor(private route: ActivatedRoute, private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.userCreateForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)], usernameUsedValidator(this.usersService, null)),
      'new-password': new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
      'new-password-repeat': new FormControl(null)
    }, this.passwordRepeatMatchValidator);
  }

  onSubmit(){
    if(this.userCreateForm.valid){
      let newUser: User = new User();
      newUser.username = this.userCreateForm.value['username'];
      newUser.password = this.userCreateForm.value['new-password'];
      this.usersService.createUser(newUser).subscribe(() => {
        this.usersService.emitUsersChanged();
        this.router.navigate(['../list'], {relativeTo: this.route});
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
