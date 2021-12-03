import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/shared/question.model';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent implements OnInit {

  question: Question = {
    id: 1,
    title: 'Static/Dynamic vs Strong/Weakwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
    content: "I see these terms bandied around all over the place in programming and I have a vague notion of what they mean. A search shows me that such things have been asked all over stack overflow in fact. As far as I'm aware Static/Dynamic typing in languages is subtly different to Strong/Weak typing but what that difference is eludes me. Different sources seem to use different meanings or even use the terms interchangeably. I can't find somewhere that talks about both and actually spells out the difference. What would be nice is if someone could please spell this out clearly here for me and the rest of the worldwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww.",
    author: 'Author',
    creationDate: new Date(2020, 11, 3),
    isClosed: false,
    numberOfUpVotes: 3,
    numberOfDownVotes: 10,
    numberOfAnswers: 3
  };

  answers = {

  }

  constructor() { }

  ngOnInit(): void {
  }

}
