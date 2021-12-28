import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Question } from 'src/app/shared/question.model';
import { QuestionsService } from 'src/app/shared/questions.service';

@Component({
  selector: 'app-open-questions',
  templateUrl: './open-questions.component.html',
  styleUrls: ['./open-questions.component.css']
})
export class OpenQuestionsComponent implements OnInit, OnDestroy {

  questions: Question[] = [];
  questionsChangedSub: Subscription;

  constructor(private questionsService: QuestionsService) { }

  ngOnInit(): void {
    this.questionsService.getOpenQuestions().subscribe((questions) => {
      this.questions = questions;
    });
    this.questionsChangedSub = this.questionsService.questionsChanged.subscribe(() => {
      this.questionsService.getOpenQuestions().subscribe((questions) => {
        this.questions = questions;
      });
    })
  }

  ngOnDestroy(){
    this.questionsChangedSub.unsubscribe();
  }

}
