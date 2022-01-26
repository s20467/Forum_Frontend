import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Answer } from 'src/app/shared/answer.model';
import { QuestionsService } from 'src/app/shared/questions.service';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-answer-list-item',
  templateUrl: './answer-list-item.component.html',
  styleUrls: ['./answer-list-item.component.css']
})
export class AnswerListItemComponent implements OnInit {

  @Input('answer') answer: Answer;

  constructor(private questionsService: QuestionsService, private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  isAnswerOwnerOrAdmin(){
    return this.usersService.isAdmin() || (this.usersService.isLoggedIn() && this.usersService.currentUser.username == this.answer?.author);
  }

  deleteAnswer(){
    this.questionsService.deleteAnswer(this.answer.id).subscribe(() => {
      this.questionsService.emitAnswersChanged();
    })
  }

  upVoteAnswer(){
    if(this.usersService.isLoggedIn())
      if(!this.isUpVoting()){
        this.questionsService.upVoteAnswer(this.answer.id).subscribe((answer: Answer) => {
          this.answer = answer;
          this.questionsService.emitAnswersChanged();
        });
      }
      else{
        this.questionsService.unUpVoteAnswer(this.answer.id).subscribe((answer: Answer) => {
          this.answer = answer;
          this.questionsService.emitAnswersChanged();
        });
      }
    else{
      this.router.navigate(['/login']);
    }
  }

  downVoteAnswer(){
    if(this.usersService.isLoggedIn())
      if(!this.isDownVoting()){
        this.questionsService.downVoteAnswer(this.answer.id).subscribe((answer: Answer) => {
          this.answer = answer;
          this.questionsService.emitQuestionsChanged();
        });
      }
      else{
        this.questionsService.unDownVoteAnswer(this.answer.id).subscribe((answer: Answer) => {
          this.answer = answer;
          this.questionsService.emitQuestionsChanged();
        });
      }
    else{
      this.router.navigate(['/login']);
    }
  }

  isUpVoting(){
    return this.usersService.isLoggedIn() && this.answer?.upVotes.map((user) => {return user as string}).includes(this.usersService.currentUser.username);
  }

  isDownVoting(){
    return this.usersService.isLoggedIn() && this.answer?.downVotes.map((user) => {return user as string}).includes(this.usersService.currentUser.username);
  }
}
