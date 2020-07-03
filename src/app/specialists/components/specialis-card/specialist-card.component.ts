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

	constructor() {

	}

	ngOnChanges() {
		this.loadReviews();
	}

	private loadReviews() {
        this.positiveReviews = this.specialist.reviews.filter(x => x.score > 4);
        this.neutralReviews = this.specialist.reviews.filter(x => x.score == 3);
        this.negativeReviews = this.specialist.reviews.filter(x => x.score < 3);
    }
}