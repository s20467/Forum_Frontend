import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Answer } from 'src/app/shared/answer.model';
import { Question } from 'src/app/shared/question.model';
import { QuestionsService } from 'src/app/shared/questions.service';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent implements OnInit {

  question: Question;

  constructor(private questionService: QuestionsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.questionService.getQuestionById(+params['questionId']).subscribe((question: Question) => {
        this.question = question;
      });
    });
  }

  toggleCloseQuestion(){
    if(this.question.closedAt == null)
      this.questionService.closeQuestion(this.question.id).subscribe((question: Question) => {
        this.question = question;
        this.questionService.emitQuestionsChanged();
      });
    else
      this.questionService.openQuestion(this.question.id).subscribe((question: Question) => {
        this.question = question;
        this.questionService.emitQuestionsChanged();
      });
  }

  deleteQuestion(){
    this.questionService.deleteQuestion(this.question.id).subscribe(() => {
      this.router.navigate(['..']);
      this.questionService.emitQuestionsChanged();
    });
  }
}
