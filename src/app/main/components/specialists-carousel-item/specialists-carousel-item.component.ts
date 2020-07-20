import { Component, AfterViewInit, Input, OnInit } from "@angular/core";
import { Specialist, Review } from 'src/app/common/models';
import { SpecialistsService, StorageService } from 'src/app/common/services';

@Component({
    selector: 'specialists-carousel-item',
	templateUrl: './specialists-carousel-item.component.html',
	styleUrls: ['./specialists-carousel-item.component.scss']
})
export class SpecialistsCarouselItemComponent implements OnInit {

    @Input('specialist') specialist: Specialist;

    public positiveReviews: Review[];
    public neutralReviews: Review[];
    public negativeReviews: Review[];

    constructor(private storageService: StorageService) {

    }

    ngOnInit() {
        this.loadReviews();
    }

    private loadReviews() {
        this.positiveReviews = this.specialist.reviews.filter(x => x.score >= 4);
        this.neutralReviews = this.specialist.reviews.filter(x => x.score == 3);
        this.negativeReviews = this.specialist.reviews.filter(x => x.score < 3);
    }

    showSpecialistDialog(specialist: Specialist){
        let dialog = document.querySelector('.choose-specialist-dialog');
        dialog.classList.remove('hidden');
        dialog.classList.add('show');
        
        this.storageService.setSpecialist(specialist);
    }
}
