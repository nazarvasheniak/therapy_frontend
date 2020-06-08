import { Component, AfterViewInit, Input, OnInit } from "@angular/core";
import { Specialist, Review } from 'src/app/common/models';
import { SpecialistsService } from 'src/app/common/services';

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
    
    public rating: number;

    constructor(
        private specialistsService: SpecialistsService
    ) {

    }

    ngOnInit() {
        this.loadReviews();
        this.loadRating();
    }

    private loadReviews() {
        this.specialistsService.getSpecialistReviews(this.specialist.id)
            .subscribe(res => {
                if (!res.success) {
                    alert(res.message);

                    return;
                }

                this.positiveReviews = res.data.filter(x => x.score > 4);
                this.neutralReviews = res.data.filter(x => x.score == 3);
                this.negativeReviews = res.data.filter(x => x.score < 3);
            });
    }

    private loadRating() {
        this.specialistsService.getSpecialistRating(this.specialist.id)
            .subscribe(res => {
                if (!res.success) {
                    alert(res.message);

                    return;
                }

                this.rating = res.data;
            });
    }
}
