import { User } from './user.model';
import { SessionStatus } from '../enums';
import { Specialist } from './specialist.model';

export class SpecialistSession {
    public specialist: Specialist;
    public sessionID: number;
    public sessionDate: Date;
    public sessionStatus: SessionStatus;
    public client: User;
    public problemText: string;
    public reviewScore: number;
    public reward: number;
    public isSpecialistClose: boolean;
    public isClientClose: boolean;
    public sessionImagesCount: number;
    public totalImagesCount: number;
    public sessionResourcesCount: number;
    public totalResourcesCount: number;
    public isAllImagesFromOneSpecialist: boolean;
    public isAllResourcesFromOneSpecialist: boolean;
}