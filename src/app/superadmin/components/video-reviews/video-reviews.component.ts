import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientVideoReview } from 'src/app/common/models';
import { AuthService } from 'src/app/common/services';
import { PaginationComponent } from 'src/app/layout/pagination/pagination.component';
import { SuperadminService } from '../../services';


@Component({
	selector: 'superadmin-video-reviews',
	templateUrl: './video-reviews.component.html',
	styleUrls: ['./video-reviews.component.scss']
})
export class SuperadminVideoReviewsComponent implements OnInit {

    public reviews: ClientVideoReview[];

    public pageSize = 5;
    public pageNumber = 1;
    public totalPages = 1;

    @ViewChild(PaginationComponent) pagination: PaginationComponent;

    constructor(
        private superAdminService: SuperadminService
    ) {
        
    }

    ngOnInit(): void {
        this.loadReviews(this.pageNumber, this.pageSize);
    }

    private loadReviews(pageNumber: number, pageSize: number) {
        this.superAdminService.getVideoReviews({ pageNumber, pageSize })
            .subscribe(response => {
                this.reviews = response.data;
                this.pageSize = response.pageSize;
                this.pageNumber = response.currentPage;
                this.totalPages = response.totalPages;
            });
    }

    setPageNumber(value: number) {
        if (!this.reviews.length) {
            return;
        }
        
        if (this.pageNumber == value) {
            return;
        }

        this.pageNumber = value;

        this.loadReviews(value, this.pageSize);
    }

    setPageSize(value: number) {
        if (!this.reviews.length) {
            return;
        }

        if (this.pageSize == value) {
            return;
        }

        this.pageSize = value;

        this.loadReviews(this.pageSize, value);
    }
}