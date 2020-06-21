import { File } from './file.model';
import { Specialist } from './specialist.model';
import { ArticleLike } from './article-like.model';
import { ArticleComment } from './article-comment.model';

export class Article {
    public id: number;
    public title: string;
    public image: File;
    public shortText: string;
    public text: string;
    public author: Specialist;
    public date: Date;
    public likes: ArticleLike[];
    public comments: ArticleComment[];
    public isLiked: boolean;
}