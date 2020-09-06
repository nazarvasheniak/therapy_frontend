import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Article, Specialist } from 'src/app/common/models';
import { SpecialistsService, StorageService } from 'src/app/common/services';

@Component({
    selector: 'articles-carousel-item',
    templateUrl: './articles-carousel-item.component.html',
    styleUrls: ['./articles-carousel-item.component.scss']
})
export class ArticlesCarouselItemComponent implements OnChanges {

    @Input('article') article: Article;

    constructor(private storageService: StorageService) {

    }

    ngOnChanges() { }

    showSpecialistDialog(specialist: Specialist){
        let dialog = document.querySelector('.choose-specialist-dialog');
        dialog.classList.remove('hidden');
        dialog.classList.add('show');
        
        this.storageService.setSpecialist(specialist);
    }
}