import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Question } from 'src/app/shared/question.model';
import { QuestionsService } from 'src/app/shared/questions.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit, OnDestroy {

  questions: Question[] = [];
  questionsChangedSub: Subscription;

  constructor(private questionsService: QuestionsService) { }

  ngOnInit(): void {
    this.questionsService.getQuestions().subscribe((questions) => {
      this.questions = questions;
    });
    this.questionsChangedSub = this.questionsService.questionsChanged.subscribe(() => {
      this.questionsService.getQuestions().subscribe((questions) => {
        this.questions = questions;
      });
    })
  }

  ngOnDestroy(){
    this.questionsChangedSub.unsubscribe();
  }

}
