import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpecialistService, AuthService } from 'src/app/common/services';
import { Specialist, SpecialistProfile, Session } from 'src/app/common/models';

@Component({
	selector: 'app-profile-specialist',
	templateUrl: './profile-specialist.component.html',
	styleUrls: ['./profile-specialist.component.scss']
})
export class ProfileSpecialistComponent implements OnInit {
    
    public profile: SpecialistProfile;
    public activeSessions: Session[]

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

                this.loadProfile();
                this.loadActiveSessions();
            });
    }

    private loadProfile() {
        this.specialistService.getSpecialistProfile()
            .subscribe(profile => {
                this.profile = profile;
            });
    }

    private loadActiveSessions() {
        this.specialistService.getActiveSessions()
            .subscribe(sessions => {
                this.activeSessions = sessions;
            });
    }

    priceStepMinus() {
        if (this.profile.price > 100) {
            this.profile.price -= 100;

            this.specialistService.changeSpecialistPrice({
                price: this.profile.price
            })
            .subscribe(res => {
                if (!res.success) {
                    this.profile.price += 100;
                }
            });
        }
    }

    priceStepPlus() {
        this.profile.price += 100;

        this.specialistService.changeSpecialistPrice({
            price: this.profile.price
        })
        .subscribe(res => {
            if (!res.success) {
                this.profile.price -= 100;
            }
        });
    }
}