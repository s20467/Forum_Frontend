import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/user.model';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  usersChangedSub: Subscription;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
    });
    this.usersChangedSub = this.usersService.usersChanged.subscribe(() => {
      this.usersService.getUsers().subscribe((users) => {
        this.users = users;
      });
    })
  }

  ngOnDestroy(){
    this.usersChangedSub.unsubscribe();
  }

}
