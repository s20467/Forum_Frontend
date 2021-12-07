import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Answer } from './answer.model';
import { Question } from './question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  // private UrlBase: string = 'http://192.168.8.109:8080/api/';
  private UrlBase: string = 'http://localhost:8080/api/';

  questionsChanged = new Subject<any>();
  answersChanged = new Subject<any>();

  

  constructor(private http: HttpClient) {}

  getQuestions(){
    return this.http.get<Question[]>(this.UrlBase + 'questions');
  }
  
  getQuestionById(questionId: number){
    return this.http.get<Question>(this.UrlBase + 'questions/' + questionId);
  }

  getAnswerById(answerId: number){
    return this.http.get<Answer>(this.UrlBase + 'answers/' + answerId);
  }

  getAnswersByQuestionsId(questionId: number){
    return this.http.get<Answer[]>(this.UrlBase + "questions/" + questionId + "/answers");
  }

  createQuestion(question: Question){
    return this.http.post<Question>(this.UrlBase + 'questions', question);
  }

  createAnswer(questionId: number, answer: Answer){
    return this.http.post<Answer>(this.UrlBase + 'questions/' + questionId + '/give-answer', answer);
  }

  updateQuestion(questionId: number, question: Question){
    return this.http.patch<Question>(this.UrlBase + 'questions/' + questionId, question);
  }

  updateAnswer(answerId: number, answer: Answer){
    return this.http.patch<Answer>(this.UrlBase + 'answers/' + answerId, answer);
  }

  closeQuestion(questionId: number){
    return this.http.post<Question>(this.UrlBase + 'questions/' + questionId + '/close', {});
  }

  openQuestion(questionId: number){
    return this.http.post<Question>(this.UrlBase + 'questions/' + questionId + '/open', {});
  }

  deleteQuestion(questionId: number){
    return this.http.delete<Question>(this.UrlBase + "questions/" + questionId);
  }

  deleteAnswer(answerId: number){
    return this.http.delete<Answer>(this.UrlBase + "answers/" + answerId);
  }

  emitQuestionsChanged(){
    this.questionsChanged.next(null);
  }

  emitAnswersChanged(){
    this.answersChanged.next(null);
  }
}