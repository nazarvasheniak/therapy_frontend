import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { SpecialistsService } from 'src/app/common/services';
import { Specialist, Review } from 'src/app/common/models';

@Component({
	selector: 'app-specialist-card',
	templateUrl: './specialist-card.component.html',
	styleUrls: ['./specialist-card.component.scss']
})
export class SpecialistCardComponent implements OnChanges {

	@Input('specialist') public specialist: Specialist;
	
	public positiveReviews: Review[];
    public neutralReviews: Review[];
	public negativeReviews: Review[];
	
	public rating: number;

	constructor(
		private specialistsService: SpecialistsService
	) {

	}

	ngOnChanges() {
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