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

    constructor() {

    }

    ngOnChanges() { }
}