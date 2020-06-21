import { User } from './user.model';
import { Article } from './article.model';

export class ArticleComment {
    public id: number;
    public author: User;
    public article: Article;
    public text: string;
    public isReply: boolean;
    public parentComment: ArticleComment;
}