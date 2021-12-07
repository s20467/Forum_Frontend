import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { usernameUsedValidator } from 'src/app/shared/username.validators';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.css']
})
export class UserListItemComponent implements OnInit {

  @Input('user') user;
  isEditMode = false;

  usernameEditForm: FormGroup;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usernameEditForm = new FormGroup({
      'username': new FormControl(this.user.username, [Validators.required, Validators.minLength(3), Validators.maxLength(20)], usernameUsedValidator(this.usersService, this.user.username))
    })
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
    })
  }

  onSubmit(){
    if(this.usernameEditForm.valid){
      this.usersService.editUserExcludePassword(this.user.username, {username: this.usernameEditForm.value['username']}).subscribe(() => {
        this.usersService.emitUsersChanged();
        this.isEditMode = false;
      })
    }
  }

}
