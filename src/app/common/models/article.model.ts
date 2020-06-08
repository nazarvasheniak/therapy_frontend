import { File } from './file.model';
import { Specialist } from './specialist.model';

export class Article {
    public id: number;
    public title: string;
    public image: File;
    public shortText: string;
    public text: string;
    public author: Specialist;
    public date: Date;
}