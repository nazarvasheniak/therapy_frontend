import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecialistsService } from 'src/app/common/services';
import { Specialist, Review } from 'src/app/common/models';
import { ReviewsTabs } from './reviews-tabs.enum';
import { ViewHelper } from 'src/app/common/helpers';

@Component({
	selector: 'app-specialist',
	templateUrl: './specialist.component.html',
	styleUrls: ['./specialist.component.scss']
})
export class SpecialistComponent implements OnInit {

	public specialist: Specialist;
	public activeReviewsTab = ReviewsTabs.Positive;

	public positiveReviews: Review[];
    public neutralReviews: Review[];
    public negativeReviews: Review[];
    
    public rating: number;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private specialistsService: SpecialistsService
	) {

	}

	ngOnInit() {
		this.route.params
			.subscribe(params => {
				const id = params['id'];

				if (!id) {
					this.router.navigate(['/specialists']);

					return;
				}

				this.loadSpecialist(id);
			});
	}
	
	changeReviewsTab(tab: ReviewsTabs) {
		this.activeReviewsTab = tab;
	}

	getRatingStars() {
		return ViewHelper.buildRatingStars(this.rating);
	}

	private loadSpecialist(id: number) {
		this.specialistsService.getSpecialist(id)
			.subscribe(res => {
				if (!res.success) {
					alert(res.message);

					return;
				}

				this.specialist = res.data;
				
				this.loadReviews();
				this.loadRating();
			});
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