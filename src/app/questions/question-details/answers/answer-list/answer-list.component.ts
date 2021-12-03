import { Component, OnInit } from '@angular/core';
import { Answer } from 'src/app/shared/answer.model';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.css']
})
export class AnswerListComponent implements OnInit {

  answers: Answer[] = [
    {
      id: 1,
      content: 'Ttreść odpowiedzi, Treśććććććććććććććććććććććććććććććććććććććććććććććććććććććććććććć odpowiedziwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww, Treść odpowiedzi, Treść odpowiedzi, Treść odpowiedzi, Treść odpowiedzi, Treść odpowiedzi, Treść odpowiedzi, Treść odpowiedzi, Treść odpowiedzi',
      author: 'Autor',
      creationDate: new Date(2020, 12, 3),
      numberOfUpVotes: 5,
      numberOfDownVotes: 3
    },
    {
      id: 2,
      content: 'Ttreść odpowiedzi, Treść odpowiedziwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww, Treść odpowiedzi, Treść odpowiedzi, Treść odpowiedzi, Treść odpowiedzi, Treść odpowiedzi, Treść odpowiedzi, Treść odpowiedzi, Treść odpowiedzi',
      author: 'Autor',
      creationDate: new Date(2020, 12, 3),
      numberOfUpVotes: 5,
      numberOfDownVotes: 3
    },
    {
      id: 3,
      content: 'Ttreść odpowiedzi, Treść odpowiedziwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww, Treść odpowiedzi, Treść odpowiedzi, Treść odpowiedzi, Treść odpowiedzi, Treść odpowiedzi, Treść odpowiedzi, Treść odpowiedzi, Treść odpowiedzi',
      author: 'Autor',
      creationDate: new Date(2020, 12, 3),
      numberOfUpVotes: 5,
      numberOfDownVotes: 3
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
