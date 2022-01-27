import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/user.model';
import { usernameUsedValidator } from 'src/app/shared/username.validators';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.css']
})
export class UserListItemComponent implements OnInit {

  @Input('user') user: User;
  isEditMode = false;

  usernameEditForm: FormGroup;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usernameEditForm = new FormGroup({
      'username': new FormControl(this.user.username, [Validators.required, Validators.minLength(3), Validators.maxLength(20)], usernameUsedValidator(this.usersService, this.user.username))
    })
  }

  isQuestionOwnerOrAdmin(){
    return this.usersService.isAdmin() || (this.usersService.isLoggedIn() && this.usersService.currentUser.username == this.user?.username);
  }

  onToggleOnEditMode(){
    this.isEditMode = true;
  }

  onRejectUsernameChange(){
    this.isEditMode = false;
  }

  deleteUser(){
    this.usersService.deleteUser(this.user.username).subscribe(() => {
      this.usersService.emitUsersChanged();
      if(this.usersService.currentUser.username == this.user?.username){
        this.usersService.logout();
      }
    })
  }

  onSubmit(){
    if(this.usernameEditForm.valid){
      this.usersService.editUserExcludePassword(this.user.username, {username: this.usernameEditForm.value['username']}).subscribe(
        () => {
          this.usersService.emitUsersChanged();
          this.isEditMode = false;
          this.usersService.logout();
        },
        (error: Error) => {
          this.usernameEditForm.setErrors({'unknownValidationError': true});
        }
        )
    }
  }

}
