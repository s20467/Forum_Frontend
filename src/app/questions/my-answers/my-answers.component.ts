import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Question } from 'src/app/shared/question.model';
import { QuestionsService } from 'src/app/shared/questions.service';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-my-answers',
  templateUrl: './my-answers.component.html',
  styleUrls: ['./my-answers.component.css']
})
export class MyAnswersComponent implements OnInit {

  questions: Question[] = [];
  questionsChangedSub: Subscription;

  constructor(private questionsService: QuestionsService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.questionsService.getQuestionsAnsweredByUser(this.usersService.currentUser.username).subscribe((questions) => {
      this.questions = questions;
    });
    this.questionsChangedSub = this.questionsService.questionsChanged.subscribe(() => {
      this.questionsService.getQuestionsAnsweredByUser(this.usersService.currentUser.username).subscribe((questions) => {
        this.questions = questions;
      });
    })
  }

  ngOnDestroy(){
    this.questionsChangedSub.unsubscribe();
  }

}
