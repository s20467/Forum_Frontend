import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/shared/question.model';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  questions: Question[] = [
    {
      id: 1,
      title: 'What is the difference between statically typed and dynamically typed languageswwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww?',
      content: 'I hear a lot that new programming languages are dynamically typed but what does it actually mean when we say a language is dynamically typed vs. statically typedwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww?',
      author: 'Author',
      creationDate: new Date(2020, 11, 3),
      isClosed: false,
      numberOfUpVotes: 3,
      numberOfDownVotes: 10,
      numberOfAnswers: 3
    },
    {
      id: 2,
      title: 'What is the difference between a strongly typed language and a statically typed language?',
      content: 'Also, does one imply the other?',
      author: 'Author',
      creationDate: new Date(2020, 11, 3),
      isClosed: false,
      numberOfUpVotes: 3,
      numberOfDownVotes: 10,
      numberOfAnswers: 3
    },
    {
      id: 3,
      title: 'Static/Dynamic vs Strong/Weak',
      content: "I see these terms bandied around all over the place in programming and I have a vague notion of what they mean. A search shows me that such things have been asked all over stack overflow in fact. As far as I'm aware Static/Dynamic typing in languages is subtly different to Strong/Weak typing but what that difference is eludes me. Different sources seem to use different meanings or even use the terms interchangeably. I can't find somewhere that talks about both and actually spells out the difference. What would be nice is if someone could please spell this out clearly here for me and the rest of the world.",
      author: 'Author',
      creationDate: new Date(2020, 11, 3),
      isClosed: false,
      numberOfUpVotes: 3,
      numberOfDownVotes: 10,
      numberOfAnswers: 3
    },
    {
      id: 4,
      title: 'Tytul Pytania, Tytul Pytania, Tytul Pytani',
      content: 'Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania',
      author: 'Author',
      creationDate: new Date(2020, 11, 3),
      isClosed: false,
      numberOfUpVotes: 3,
      numberOfDownVotes: 10,
      numberOfAnswers: 3
    },
    {
      id: 5,
      title: 'Tytul Pytania, Tytul Pytania, Tytul Pytani',
      content: 'Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania',
      author: 'Author',
      creationDate: new Date(2020, 11, 3),
      isClosed: false,
      numberOfUpVotes: 3,
      numberOfDownVotes: 10,
      numberOfAnswers: 3
    },
    {
      id: 6,
      title: 'Tytul Pytania, Tytul Pytania, Tytul Pytani',
      content: 'Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania',
      author: 'Author',
      creationDate: new Date(2020, 11, 3),
      isClosed: false,
      numberOfUpVotes: 3,
      numberOfDownVotes: 10,
      numberOfAnswers: 3
    },
    {
      id: 7,
      title: 'Tytul Pytania, Tytul Pytania, Tytul Pytani',
      content: 'Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania',
      author: 'Author',
      creationDate: new Date(2020, 11, 3),
      isClosed: false,
      numberOfUpVotes: 3,
      numberOfDownVotes: 10,
      numberOfAnswers: 3
    },
    {
      id: 8,
      title: 'Tytul Pytania, Tytul Pytania, Tytul Pytani',
      content: 'Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania',
      author: 'Author',
      creationDate: new Date(2020, 11, 3),
      isClosed: false,
      numberOfUpVotes: 3,
      numberOfDownVotes: 10,
      numberOfAnswers: 3
    },
    {
      id: 9,
      title: 'Tytul Pytania, Tytul Pytania, Tytul Pytani',
      content: 'Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania, Treść pytania',
      author: 'Author',
      creationDate: new Date(2020, 11, 3),
      isClosed: false,
      numberOfUpVotes: 3,
      numberOfDownVotes: 10,
      numberOfAnswers: 3
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
