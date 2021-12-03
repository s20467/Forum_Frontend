import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswerEditComponent } from './questions/question-details/answers/answer-edit/answer-edit.component';
import { AnswerListComponent } from './questions/question-details/answers/answer-list/answer-list.component';
import { AnswersComponent } from './questions/question-details/answers/answers.component';
import { QuestionDetailsComponent } from './questions/question-details/question-details.component';
import { QuestionEditComponent } from './questions/question-edit/question-edit.component';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { QuestionsComponent } from './questions/questions.component';
import { LoginComponent } from './users/login/login.component';
import { UserChangePasswordComponent } from './users/user-change-password/user-change-password.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path: '', redirectTo: '/questions', pathMatch: 'full'},
  {path: 'questions', component: QuestionsComponent, children:[
    {path: 'new', component: QuestionEditComponent},
    {path: ':questionId/edit', component: QuestionEditComponent},
    {path: ':questionId/answers', component: QuestionDetailsComponent, children:[
      {path: '', component: AnswersComponent, children:[
        {path: '', component: AnswerListComponent},
        {path: 'new', component: AnswerEditComponent},
        {path: ':answerId/edit', component: AnswerEditComponent}
      ]}
    ]},
    {path: '', component: QuestionListComponent, pathMatch: 'full'},
  ]},
  {path: 'users', component: UsersComponent, children:[
    {path: '', redirectTo: 'list', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'change-password', component: UserChangePasswordComponent},
    {path: 'list', component: UserListComponent},
    {path: 'register', component: UserCreateComponent},
    {path: 'new', component: UserCreateComponent},
    {path: 'list', component: LoginComponent}
  ]},
  {path: 'login', redirectTo: 'users/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
