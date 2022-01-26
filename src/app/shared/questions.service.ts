import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Answer } from './answer.model';
import { Question } from './question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private UrlBase: string = environment.apiUrlBase;

  questionsChanged = new Subject<any>();
  answersChanged = new Subject<any>();

  

  constructor(private http: HttpClient) {}

  getQuestions(){
    return this.http.get<Question[]>(this.UrlBase + 'api/questions');
  }
  
  getQuestionById(questionId: number){
    return this.http.get<Question>(this.UrlBase + 'api/questions/' + questionId);
  }

  getAnswerById(answerId: number){
    return this.http.get<Answer>(this.UrlBase + 'api/answers/' + answerId);
  }

  getAnswersByQuestionsId(questionId: number){
    return this.http.get<Answer[]>(this.UrlBase + "api/questions/" + questionId + "/answers");
  }

  getQuestionsByUser(username: string){
    return this.http.get<Question[]>(this.UrlBase + "api/questions/get-by-author/" + username);
  }

  getOpenQuestions(){
    return this.http.get<Question[]>(this.UrlBase + "api/questions/not-closed");
  }

  getQuestionsAnsweredByUser(username: string){
    return this.http.get<Question[]>(this.UrlBase + "api/questions/answered-by/" + username);
  }

  createQuestion(question: Question){
    return this.http.post<Question>(this.UrlBase + 'api/questions', question);
  }

  createAnswer(questionId: number, answer: Answer){
    return this.http.post<Answer>(this.UrlBase + 'api/questions/' + questionId + '/give-answer', answer);
  }

  updateQuestion(questionId: number, question: Question){
    return this.http.patch<Question>(this.UrlBase + 'api/questions/' + questionId, question);
  }

  updateAnswer(answerId: number, answer: Answer){
    return this.http.patch<Answer>(this.UrlBase + 'api/answers/' + answerId, answer);
  }

  closeQuestion(questionId: number){
    return this.http.post<Question>(this.UrlBase + 'api/questions/' + questionId + '/close', {});
  }

  openQuestion(questionId: number){
    return this.http.post<Question>(this.UrlBase + 'api/questions/' + questionId + '/open', {});
  }

  deleteQuestion(questionId: number){
    return this.http.delete<Question>(this.UrlBase + "api/questions/" + questionId);
  }

  deleteAnswer(answerId: number){
    return this.http.delete<Answer>(this.UrlBase + "api/answers/" + answerId);
  }

  upVoteQuestion(questionId: number){
    return this.http.get<Question>(this.UrlBase + "api/questions/" + questionId + "/upvote");
  }

  unUpVoteQuestion(questionId: number){
    return this.http.get<Question>(this.UrlBase + "api/questions/" + questionId + "/unupvote");
  }

  downVoteQuestion(questionId: number){
    return this.http.get<Question>(this.UrlBase + "api/questions/" + questionId + "/downvote");
  }

  unDownVoteQuestion(questionId: number){
    return this.http.get<Question>(this.UrlBase + "api/questions/" + questionId + "/undownvote");
  }

  upVoteAnswer(answerId: number){
    return this.http.get<Answer>(this.UrlBase + "api/answers/" + answerId + "/upvote");
  }

  unUpVoteAnswer(answerId: number){
    return this.http.get<Answer>(this.UrlBase + "api/answers/" + answerId + "/unupvote");
  }

  downVoteAnswer(answerId: number){
    return this.http.get<Answer>(this.UrlBase + "api/answers/" + answerId + "/downvote");
  }

  unDownVoteAnswer(answerId: number){
    return this.http.get<Answer>(this.UrlBase + "api/answers/" + answerId + "/undownvote");
  }

  emitQuestionsChanged(){
    this.questionsChanged.next(null);
  }

  emitAnswersChanged(){
    this.answersChanged.next(null);
  }
}