import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Answer } from 'src/app/shared/answer.model';
import { QuestionsService } from 'src/app/shared/questions.service';
import { User } from 'src/app/shared/user.model';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-answer-edit',
  templateUrl: './answer-edit.component.html',
  styleUrls: ['./answer-edit.component.css']
})
export class AnswerEditComponent implements OnInit {

  questionId: number;
  answer: Answer = new Answer();
  isEditMode: boolean = false;
  users: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private questionsService: QuestionsService, 
    public usersService: UsersService) {
      if(!this.usersService.isLoggedIn())
      this.router.navigate(['/login']);
    }

    ngOnInit(): void {
      if(this.usersService.isAdmin()){
        this.usersService.getUsers()
          .pipe(
            map((users: User[]) => {
              return users.map((user: User) => {
                return user.username;
              })
            })
          )
          .subscribe((users: string[]) => {
            this.users = users;
          }
        );
      }
      this.questionId = +this.route.snapshot.parent.params['questionId'];
      let answerId: number = +this.route.snapshot.params['answerId'];
      if(answerId){
        this.isEditMode = true;
        this.questionsService.getAnswerById(answerId).subscribe((answer: Answer) => {
          this.answer = answer;
        });
      }
    }
  
    onSubmit(form: NgForm){
      if(this.usersService.isAdmin()){
        if(form.valid){
          if(!this.isEditMode){
            this.questionsService.createAnswerAdmin(this.questionId, form.value).subscribe(
              (response) => {
                this.questionsService.emitAnswersChanged();
                this.router.navigate(['../..'], {relativeTo: this.route});
              },
              (error: Error) => {
                form.form.setErrors({'unknownValidationError': true});
              }
            );
          }
          else{
            this.questionsService.updateAnswerAdmin(this.answer.id, form.value).subscribe(
              (response) => {
                this.questionsService.emitAnswersChanged();
                this.router.navigate(['../..'], {relativeTo: this.route});
              },
              (error: Error) => {
                form.form.setErrors({'unknownValidationError': true});
              }
            );
          }
        }
      }
      else{
        if(!this.isEditMode){
          this.questionsService.createAnswer(this.questionId, form.value).subscribe(
            (response) => {
              this.questionsService.emitAnswersChanged();
              this.router.navigate(['../..'], {relativeTo: this.route});
            },
            (error: Error) => {
              form.form.setErrors({'unknownValidationError': true});
            }
          );
        }
        else{
          this.questionsService.updateAnswer(this.answer.id, form.value).subscribe(
            (response) => {
              this.questionsService.emitAnswersChanged();
              this.router.navigate(['../..'], {relativeTo: this.route});
            },
            (error: Error) => {
              form.form.setErrors({'unknownValidationError': true});
            }
          );
        }
      }
    }

}
