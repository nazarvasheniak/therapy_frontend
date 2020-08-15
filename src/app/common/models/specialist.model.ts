import { User } from './user.model';
import { File } from './file.model';
import { Review } from './review.model';

export class Specialist {
    public id: number;
    public price: number;
    public rating: number;
    public description: string;
    public reviews: Review[];
    public user: User;
    public photo: File;
}