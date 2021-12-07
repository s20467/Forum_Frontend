import { Question } from "./question.model";
import { User } from "./user.model";

export class Answer{
    id: number;
    content: string;
    author: string | User;
    createdAt: Date;
    isBestAnswer: boolean;
    targetQuestion: number | Question;
    upVotes: number[] | string[] | User[];
    downVotes: number[] | string[] | User[];
}