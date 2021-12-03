import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-answer-list-item',
  templateUrl: './answer-list-item.component.html',
  styleUrls: ['./answer-list-item.component.css']
})
export class AnswerListItemComponent implements OnInit {

  @Input('answer') answer;

  constructor() { }

  ngOnInit(): void {
  }

}
