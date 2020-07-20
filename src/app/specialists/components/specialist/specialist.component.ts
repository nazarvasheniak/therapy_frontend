import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecialistsService, StorageService } from 'src/app/common/services';
import { Specialist, Review } from 'src/app/common/models';
import { ReviewsTabs } from './reviews-tabs.enum';
import { ViewHelper } from 'src/app/common/helpers';
import { ReviewType } from 'src/app/common/enums';

@Component({
	selector: 'app-specialist',
	templateUrl: './specialist.component.html',
	styleUrls: ['./specialist.component.scss']
})
export class SpecialistComponent implements OnInit {

	public specialist: Specialist;
	public activeReviewsTab = ReviewType.Positive;

	public positiveReviews: Review[] = [];
    public neutralReviews: Review[] = [];
	public negativeReviews: Review[] = [];
	
	public pageSize = 4;
	public pageNumber = 1;
	public totalPages = 1;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private specialistsService: SpecialistsService,
		private storageService: StorageService
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
	
	changeReviewsTab(tab: ReviewType) {
		this.activeReviewsTab = tab;
		this.loadReviews(tab, this.pageNumber);
	}

	setPageNumber(value: number) {
		this.loadReviews(this.activeReviewsTab, value);
	}

	getRatingStars(rating: number) {
		return ViewHelper.buildRatingStars(rating);
	}

	private loadSpecialist(id: number) {
		this.specialistsService.getSpecialist(id)
			.subscribe(res => {
				if (!res.success) {
					alert(res.message);

					return;
				}

				this.specialist = res.data;
				this.positiveReviews = this.specialist.reviews.filter(x => x.score > 3);
				this.neutralReviews = this.specialist.reviews.filter(x => x.score == 3);
				this.negativeReviews = this.specialist.reviews.filter(x => x.score < 3);

				this.route.queryParams
					.subscribe(params => {
						if (!params['reviews']) {
							this.loadReviews(this.activeReviewsTab, this.pageNumber);

							return;
						}

						this.changeReviewsTab(params['reviews'] as ReviewType);
					});
			});
	}

	private loadReviews(type: ReviewType, pageNumber: number) {
		this.specialistsService.getSpecialistReviews({
			pageNumber: pageNumber,
			pageSize: this.pageSize,
			type: type
		}, this.specialist.id)
		.subscribe(res => {
			if (!res.success) {
				alert(res.message);

				return;
			}

			switch (type) {
				case ReviewType.Positive:
					this.positiveReviews = res.data;
					break;

				case ReviewType.Neutral:
					this.neutralReviews = res.data;
					break;

				case ReviewType.Negative:
					this.negativeReviews = res.data;
					break;
			}

			this.pageNumber = res.currentPage;
			this.totalPages = res.totalPages;
		});
	}

	showSpecialistDialog(specialist: Specialist){
        let dialog = document.querySelector('.choose-specialist-dialog');
        dialog.classList.remove('hidden');
        dialog.classList.add('show');
        
        this.storageService.setSpecialist(specialist);
    }
}