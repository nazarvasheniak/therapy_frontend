import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecialistsService, StorageService, RouterExtService } from 'src/app/common/services';
import { Specialist, Review } from 'src/app/common/models';
import { ReviewType } from 'src/app/common/enums';

type ReviewTab = 'Positive' | 'Neutral' | 'Negative';

@Component({
	selector: 'app-specialist',
	templateUrl: './specialist.component.html',
	styleUrls: ['./specialist.component.scss']
})
export class SpecialistComponent implements OnInit {

	public specialist: Specialist;
	public activeReviewsTab: ReviewTab = 'Positive';

	public positiveReviews: Review[] = [];
    public neutralReviews: Review[] = [];
	public negativeReviews: Review[] = [];
	
	public pageSize = 4;
	public pageNumber = 1;
	public totalPages = 1;

	@ViewChild('reviewsTabs') private reviewsTabs: ElementRef<HTMLUListElement>;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private routerService: RouterExtService,
		private specialistsService: SpecialistsService,
		private storageService: StorageService
	) {

	}

	prevRoute() {
		this.router.navigate([this.routerService.getPreviousUrl()]);
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

	changeReviewsTab(tab: ReviewTab) {
		this.activeReviewsTab = tab;
		this.loadReviews(tab, this.pageNumber);

        const item = this.reviewsTabs.nativeElement.getElementsByTagName('li').namedItem(tab);
        const margin = parseInt(window.getComputedStyle(item).marginLeft);
        
        const scrollTo = (margin / 2) + (item.offsetLeft - item.offsetWidth);

        this.reviewsTabs.nativeElement.scrollTo({
            left: scrollTo,
            behavior: 'smooth'
        });
    }

	setPageNumber(value: number) {
		this.loadReviews(this.activeReviewsTab, value);
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

						this.changeReviewsTab(params['reviews'] as ReviewTab);
					});
			});
	}

	private loadReviews(type: ReviewTab, pageNumber: number) {
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
				case "Positive":
					this.positiveReviews = res.data;
					break;

				case "Neutral":
					this.neutralReviews = res.data;
					break;

				case "Negative":
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