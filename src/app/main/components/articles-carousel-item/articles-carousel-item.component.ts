import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Article } from 'src/app/common/models';
import { SpecialistsService } from 'src/app/common/services';

@Component({
    selector: 'articles-carousel-item',
    templateUrl: './articles-carousel-item.component.html',
    styleUrls: ['./articles-carousel-item.component.scss']
})
export class ArticlesCarouselItemComponent implements OnChanges {

    @Input('article') article: Article;

    public authorRating: number;

    constructor(
        private specialistsService: SpecialistsService
    ) {

    }

    ngOnChanges() {
        this.loadAuthorRating();
    }

    private loadAuthorRating() {
        this.specialistsService.getSpecialistRating(this.article.author.id)
            .subscribe(res => {
                if (!res.success) {
                    alert(res.message);

                    return;
                }

                this.authorRating = res.data;
            });
    }
}