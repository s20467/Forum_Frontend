import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Question } from 'src/app/shared/question.model';
import { QuestionsService } from 'src/app/shared/questions.service';
import { User } from 'src/app/shared/user.model';
import { UsersService } from 'src/app/shared/users.service';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {

  question: Question = new Question();
  isEditMode: boolean = false;
  users: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private questionsService: QuestionsService, 
    private usersService: UsersService) {}

  ngOnInit(): void {
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
    let questionId: number = +this.route.snapshot.params['questionId'];
    if(questionId){
      this.isEditMode = true;
      this.questionsService.getQuestionById(questionId).subscribe((question: Question) => {
        this.question = question;
      });
    }
  }

  onSubmit(form: NgForm){
    if(form.valid){
      if(!this.isEditMode){
        this.questionsService.createQuestion(form.value).subscribe(
          (response) => {
            this.questionsService.emitQuestionsChanged();
            this.router.navigate(['..'], {relativeTo: this.route});
          }
        );
      }
      else{
        this.questionsService.updateQuestion(this.question.id, form.value).subscribe(
          (response) => {
            this.questionsService.emitQuestionsChanged();
            this.router.navigate(['..'], {relativeTo: this.route});
          }
        );
      }
    }
  }

}
