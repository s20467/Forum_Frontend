import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Question } from 'src/app/shared/question.model';
import { QuestionsService } from 'src/app/shared/questions.service';
import { User } from 'src/app/shared/user.model';
import { UsersService } from 'src/app/shared/users.service';
import { map } from 'rxjs/operators'
import { Location } from '@angular/common';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {

  question: Question = new Question();
  isEditMode: boolean = false;
  users: string[] = [];
  questionEditForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private questionsService: QuestionsService, 
    public usersService: UsersService,
    private location: Location) {
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
      this.questionEditForm = new FormGroup({
        'title': new FormControl(this.question.title, [Validators.required, Validators.minLength(10), Validators.maxLength(255)]),
        'content': new FormControl(this.question.content),
        'createdAt': new FormControl(this.question.createdAt, Validators.required),
        'closedAt': new FormControl(this.question.closedAt),
        'author': new FormControl(this.question.author, Validators.required),
      }, this.datesChronologyValidator);
      let questionId: number = +this.route.snapshot.params['questionId'];
      if(questionId){
        this.isEditMode = true;
        this.questionsService.getQuestionById(questionId).subscribe((question: Question) => {
          this.question = question;
          this.questionEditForm.setValue({
            'title': this.question.title,
            'content': this.question.content,
            'createdAt': this.question.createdAt,
            'closedAt': this.question.closedAt,
            'author': this.question.author
          })
        });
      }
    }
    else{
      this.questionEditForm = new FormGroup({
        'title': new FormControl(this.question.title, [Validators.required, Validators.minLength(10), Validators.maxLength(255)]),
        'content': new FormControl(this.question.content)
      });
      let questionId: number = +this.route.snapshot.params['questionId'];
      if(questionId){
        this.isEditMode = true;
        this.questionsService.getQuestionById(questionId).subscribe((question: Question) => {
          this.question = question;
          this.questionEditForm.setValue({
            'title': this.question.title,
            'content': this.question.content
          })
        });
      }
    }
    
  }

  onSubmit(){
    if(this.questionEditForm.valid){
      if(this.usersService.isAdmin()){
        if(!this.isEditMode){
          this.questionsService.createQuestionAdmin(this.questionEditForm.value).subscribe(
            (response) => {
              this.questionsService.emitQuestionsChanged();
              // this.router.navigate(['..'], {relativeTo: this.route});
              this.location.back();
            },
            (error: Error) => {
              this.questionEditForm.setErrors({'unknownValidationError': true});
              console.log(error);
            }
          );
        }
        else{
          this.questionsService.updateQuestionAdmin(this.question.id, this.questionEditForm.value).subscribe(
            (response) => {
              this.questionsService.emitQuestionsChanged();
              // this.router.navigate(['..'], {relativeTo: this.route});
              this.location.back();
            },
            (error: Error) => {
              this.questionEditForm.setErrors({'unknownValidationError': true});
              console.log(error);
            }
          );
        }
      }
      else{
        if(!this.isEditMode){
          this.questionsService.createQuestion(this.questionEditForm.value).subscribe(
            (response) => {
              this.questionsService.emitQuestionsChanged();
              // this.router.navigate(['..'], {relativeTo: this.route});
              this.location.back();
            },
            (error: Error) => {
              this.questionEditForm.setErrors({'unknownValidationError': true});
            }
          );
        }
        else{
          this.questionsService.updateQuestion(this.question.id, this.questionEditForm.value).subscribe(
            (response) => {
              this.questionsService.emitQuestionsChanged();
              // this.router.navigate(['..'], {relativeTo: this.route});
              this.location.back();
            },
            (error: Error) => {
              this.questionEditForm.setErrors({'unknownValidationError': true});
            }
          );
        }
      }
    }
  }

  datesChronologyValidator(group: FormGroup): ValidationErrors{
    if(Date.parse(group.controls['createdAt'].value) > Date.parse(group.controls['closedAt'].value)){
      group.controls['closedAt'].setErrors({closedAtBeforeCreatedAt: true});
      return {passwordRepeatMatch: true};
    }
    return null;
  }

}
