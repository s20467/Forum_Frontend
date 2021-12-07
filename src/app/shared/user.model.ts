import { Answer } from "./answer.model";
import { Question } from "./question.model";

export class User{
    id: number;
    username: string;
    password: string;
    askedQuestions: number[] | Question[];
    givenAnswers: number[] | Answer[];
    upVotedQuestions: number[] | Question[];
    upVotedAnswers: number[] | Answer[];
    downVotedQuestions: number[] | Question[];
    downVotedAnswers: number[] | Answer[];
}