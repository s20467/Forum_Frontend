export class Question{
    id: number;
    title: string;
    content: string;
    author: string;
    creationDate: Date;
    isClosed: boolean;
    numberOfUpVotes: number;
    numberOfDownVotes: number;
    numberOfAnswers: number;
}