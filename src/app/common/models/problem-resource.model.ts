import { Session } from './session.model';

export class ProblemResource {
    public id: number;
    public session: Session;
    public title: string;
    public emotion: string;
    public location: string;
    public characteristic: string;
    public influence: string;
    public likeScore: number;
}