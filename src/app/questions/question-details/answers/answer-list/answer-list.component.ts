import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Answer } from 'src/app/shared/answer.model';
import { Question } from 'src/app/shared/question.model';
import { QuestionsService } from 'src/app/shared/questions.service';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.css']
})
export class AnswerListComponent implements OnInit, OnDestroy {

  questionId: number;
  answers: Answer[] = [];
  answersChangedSub: Subscription;

  constructor(private questionsService: QuestionsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.questionId = +params['questionId'];
      this.questionsService.getAnswersByQuestionsId(this.questionId).subscribe((answers: Answer[]) =>{
        this.answers = answers;
      });
    })
    this.answersChangedSub = this.questionsService.answersChanged.subscribe(() => {
      this.questionsService.getAnswersByQuestionsId(this.questionId).subscribe((answers) => {
        this.answers = answers;
      });
    });
  }

  ngOnDestroy(){
    this.answersChangedSub.unsubscribe();
  }

}
