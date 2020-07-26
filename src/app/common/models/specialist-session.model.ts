import { User } from './user.model';
import { SessionStatus } from '../enums';

export class SpecialistSession {
    public sessionID: number;
    public sessionDate: Date;
    public sessionStatus: SessionStatus;
    public client: User;
    public problemText: string;
    public reviewScore: number;
    public reward: number;
}