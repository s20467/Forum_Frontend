import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Question } from 'src/app/shared/question.model';
import { QuestionsService } from 'src/app/shared/questions.service';

@Component({
  selector: 'app-user-questions',
  templateUrl: './user-questions.component.html',
  styleUrls: ['./user-questions.component.css']
})
export class UserQuestionsComponent implements OnInit, OnDestroy {

  questions: Question[] = [];
  username: string;
  questionsChangedSub: Subscription;

  constructor(private questionsService: QuestionsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.username = params['username'];
      this.questionsService.getQuestionsByUser(this.username).subscribe((questions) => {
        this.questions = questions;
      });
      if(this.questionsChangedSub)
        this.questionsChangedSub.unsubscribe();
      this.questionsChangedSub = this.questionsService.questionsChanged.subscribe(() => {
        this.questionsService.getQuestionsByUser(this.username).subscribe((questions) => {
          this.questions = questions;
        });
      })
    });
  }

  ngOnDestroy(){
    this.questionsChangedSub.unsubscribe();
  }

}
