import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Question } from 'src/app/shared/question.model';
import { QuestionsService } from 'src/app/shared/questions.service';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-my-questions',
  templateUrl: './my-questions.component.html',
  styleUrls: ['./my-questions.component.css']
})
export class MyQuestionsComponent implements OnInit {

  questions: Question[] = [];
  questionsChangedSub: Subscription;

  constructor(private questionsService: QuestionsService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.questionsService.getQuestionsByUser(this.usersService.currentUser.username).subscribe((questions) => {
      this.questions = questions;
    });
    this.questionsChangedSub = this.questionsService.questionsChanged.subscribe(() => {
      this.questionsService.getQuestionsByUser(this.usersService.currentUser.username).subscribe((questions) => {
        this.questions = questions;
      });
    })
  }

  ngOnDestroy(){
    this.questionsChangedSub.unsubscribe();
  }

}
