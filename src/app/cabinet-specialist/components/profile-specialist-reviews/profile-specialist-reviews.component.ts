import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpecialistService, AuthService } from 'src/app/common/services';
import { Specialist, SpecialistProfile, Session } from 'src/app/common/models';

@Component({
	selector: 'app-profile-specialist-reviews',
	templateUrl: './profile-specialist-reviews.component.html',
	styleUrls: ['./profile-specialist-reviews.component.scss']
})
export class ProfileSpecialistReviewsComponent implements OnInit {

    public activeTab = 1;

    constructor(
        private authService: AuthService,
        private specialistService: SpecialistService,
        private router: Router
    ) {

    }

    ngOnInit(): void {
        this.authService.isLoggedIn
            .subscribe(logged => {
                if (!logged) {
                    this.router.navigate(['/']);

                    return;
                }
            });
    }

    setActiveTab(tab: number) {
        this.activeTab = tab;
    }
}