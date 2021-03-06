import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionMenuComponent } from './questions/question-menu/question-menu.component';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { QuestionListItemComponent } from './questions/question-list/question-list-item/question-list-item.component';
import { ShortenPipe } from './shared/shorten.pipe';
import { QuestionEditComponent } from './questions/question-edit/question-edit.component';
import { QuestionDetailsComponent } from './questions/question-details/question-details.component';
import { AnswersComponent } from './questions/question-details/answers/answers.component';
import { AnswerListComponent } from './questions/question-details/answers/answer-list/answer-list.component';
import { AnswerEditComponent } from './questions/question-details/answers/answer-edit/answer-edit.component';
import { AnswerListItemComponent } from './questions/question-details/answers/answer-list/answer-list-item/answer-list-item.component';
import { EditButtonComponent } from './shared/buttons/edit-button/edit-button.component';
import { DeleteButtonComponent } from './shared/buttons/delete-button/delete-button.component';
import { LockButtonComponent } from './shared/buttons/lock-button/lock-button.component';
import { AddButtonComponent } from './shared/buttons/add-button/add-button.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './users/login/login.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserListItemComponent } from './users/user-list/user-list-item/user-list-item.component';
import { PasswordButtonComponent } from './shared/buttons/password-button/password-button.component';
import { QuestionsButtonComponent } from './shared/buttons/questions-button/questions-button.component';
import { UserChangePasswordComponent } from './users/user-change-password/user-change-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClosedComponent } from './shared/closed/closed.component';
import { AllQuestionsComponent } from './questions/all-questions/all-questions.component';
import { UserQuestionsComponent } from './questions/user-questions/user-questions.component';
import { OpenQuestionsComponent } from './questions/open-questions/open-questions.component';
import { ValidationMessagesComponent } from './shared/validation-messages/validation-messages.component';
import { JwtInterceptor } from './shared/jwt-interceptor.service';
import { JwtRefreshInterceptor } from './shared/jwt-refresh-interceptor.service';
import { MyQuestionsComponent } from './questions/my-questions/my-questions.component';
import { MyAnswersComponent } from './questions/my-answers/my-answers.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    QuestionsComponent,
    QuestionMenuComponent,
    QuestionListComponent,
    QuestionListItemComponent,
    ShortenPipe,
    QuestionEditComponent,
    QuestionDetailsComponent,
    AnswersComponent,
    AnswerListComponent,
    AnswerEditComponent,
    AnswerListItemComponent,
    EditButtonComponent,
    DeleteButtonComponent,
    LockButtonComponent,
    AddButtonComponent,
    UsersComponent,
    LoginComponent,
    UserCreateComponent,
    UserListComponent,
    UserListItemComponent,
    PasswordButtonComponent,
    QuestionsButtonComponent,
    UserChangePasswordComponent,
    ClosedComponent,
    AllQuestionsComponent,
    UserQuestionsComponent,
    OpenQuestionsComponent,
    ValidationMessagesComponent,
    MyQuestionsComponent,
    MyAnswersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, 
      useClass: JwtRefreshInterceptor, 
      multi: true
    },
    {provide: HTTP_INTERCEPTORS, 
      useClass: JwtInterceptor, 
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
