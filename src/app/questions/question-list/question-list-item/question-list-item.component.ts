import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-list-item',
  templateUrl: './question-list-item.component.html',
  styleUrls: ['./question-list-item.component.css']
})
export class QuestionListItemComponent implements OnInit {

  @Input('question') question;

  constructor() { }

  ngOnInit(): void {
  }

}
