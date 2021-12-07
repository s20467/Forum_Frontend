import { Answer } from "./answer.model";
import { User } from "./user.model";

export class Question{
    id: number;
    title: string;
    content: string;
    author: string;
    createdAt: Date;
    bestAnswer: number | Answer;
    closedAt: Date;
    upVotes: number[] | string[] | User[];
    downVotes: number[] | string[] | User[];
    answers: number[] | Answer[];
}