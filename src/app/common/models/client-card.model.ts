import { User } from './user.model';
import { Session } from './session.model';

export class ClientCard {
    public user: User;
    public sessions: Session[];
    public problemsCount: number;
    public paid: number;
    public refundsCount: number;
    public averageScore: number;
}