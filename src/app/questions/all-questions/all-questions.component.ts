import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Question } from 'src/app/shared/question.model';
import { QuestionsService } from 'src/app/shared/questions.service';

@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.css']
})
export class AllQuestionsComponent implements OnInit, OnDestroy {

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
