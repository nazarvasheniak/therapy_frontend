import { User } from './user.model';
import { File } from './file.model';

export class Specialist {
    public id: number;
    public price: number;
    public user: User;
    public photo: File;
}