import { GetList } from './get-list.model';
import { ReviewType } from '../../enums';

type ReviewTab = 'Positive' | 'Neutral' | 'Negative';

export class GetReviews extends GetList {
    public type: ReviewTab;
}