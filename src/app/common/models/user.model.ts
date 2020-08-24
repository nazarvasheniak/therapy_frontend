import { UserRole } from '../enums';

export class User {
    public id: number;
    public firstName: string;
    public lastName: string;
    public phoneNumber: string;
    public email: string;
    public role: UserRole;
    public registeredAt: Date;
}