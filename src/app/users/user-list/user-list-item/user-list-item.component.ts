import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list-item',
  templateUrl: './user-list-item.component.html',
  styleUrls: ['./user-list-item.component.css']
})
export class UserListItemComponent implements OnInit {

  @Input('user') user;
  isEditMode = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleOnEditMode(){
    this.isEditMode = true;
  }

}
