import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/common/services';


@Component({
	selector: 'superadmin-video-reviews',
	templateUrl: './video-reviews.component.html',
	styleUrls: ['./video-reviews.component.scss']
})
export class SuperadminVideoReviewsComponent implements OnInit {

    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        
    }

    ngOnInit(): void {
        
    }
}