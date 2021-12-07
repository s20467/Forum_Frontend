import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-lock-button',
  templateUrl: './lock-button.component.html',
  styleUrls: ['./lock-button.component.css']
})
export class LockButtonComponent implements OnInit {

  @Input('is-locked') isLocked=false;

  constructor() { }

  ngOnInit(): void {
  }

}
