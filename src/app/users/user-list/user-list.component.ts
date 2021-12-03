import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [
    {username: 'Użytkownik1'},
    {username: 'Użytkownik2'},
    {username: 'Użytkownik3'},
    {username: 'Użytkownik4'},
    {username: 'Użytkownik5'},
    {username: 'Użytkownik6'},
    {username: 'Użytkownik7'},
    {username: 'Użytkownik8'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
