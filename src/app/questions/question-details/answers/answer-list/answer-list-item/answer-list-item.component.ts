import { Component, Input, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/shared/questions.service';

@Component({
  selector: 'app-answer-list-item',
  templateUrl: './answer-list-item.component.html',
  styleUrls: ['./answer-list-item.component.css']
})
export class AnswerListItemComponent implements OnInit {

  @Input('answer') answer;

  constructor(private questionsService: QuestionsService) { }

  ngOnInit(): void {
  }

  deleteAnswer(){
    this.questionsService.deleteAnswer(this.answer.id).subscribe(() => {
      this.questionsService.emitAnswersChanged();
    })
  }
}
