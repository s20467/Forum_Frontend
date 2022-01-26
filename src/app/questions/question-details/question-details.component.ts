import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Answer } from 'src/app/shared/answer.model';
import { Question } from 'src/app/shared/question.model';
import { QuestionsService } from 'src/app/shared/questions.service';
import { Location } from '@angular/common';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent implements OnInit {

  question: Question;

  constructor(private questionService: QuestionsService, private usersService: UsersService, private route: ActivatedRoute, private router: Router, private location: Location) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.questionService.getQuestionById(+params['questionId']).subscribe((question: Question) => {
        this.question = question;
      });
    });
  }

  isQuestionOwnerOrAdmin(){
    return this.usersService.isAdmin() || (this.usersService.isLoggedIn() && this.usersService.currentUser.username == this.question?.author);
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
      // this.router.navigate(['../..'], {relativeTo: this.route});
      this.location.back();
      this.questionService.emitQuestionsChanged();
    });
  }

  upVoteQuestion(){
    if(this.usersService.isLoggedIn())
      if(!this.isUpVoting()){
        this.questionService.upVoteQuestion(this.question.id).subscribe((question: Question) => {
          this.question = question;
          this.questionService.emitQuestionsChanged();
        });
      }
      else{
        this.questionService.unUpVoteQuestion(this.question.id).subscribe((question: Question) => {
          this.question = question;
          this.questionService.emitQuestionsChanged();
        });
      }
    else{
      this.router.navigate(['/login']);
    }
  }

  downVoteQuestion(){
    if(this.usersService.isLoggedIn())
      if(!this.isDownVoting()){
        this.questionService.downVoteQuestion(this.question.id).subscribe((question: Question) => {
          this.question = question;
          this.questionService.emitQuestionsChanged();
        });
      }
      else{
        this.questionService.unDownVoteQuestion(this.question.id).subscribe((question: Question) => {
          this.question = question;
          this.questionService.emitQuestionsChanged();
        });
      }
    else{
      this.router.navigate(['/login']);
    }
  }

  isUpVoting(){
    return this.usersService.isLoggedIn() && this.question?.upVotes.map((user) => {return user as string}).includes(this.usersService.currentUser.username);
  }

  isDownVoting(){
    return this.usersService.isLoggedIn() && this.question?.downVotes.map((user) => {return user as string}).includes(this.usersService.currentUser.username);
  }

}
