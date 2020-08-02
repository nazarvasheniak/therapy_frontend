import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { SpecialistService, AuthService, FilesService } from 'src/app/common/services';
import { SpecialistProfile, Problem, SpecialistProfileActiveSession } from 'src/app/common/models';
import { StringHelper } from 'src/app/common/helpers';

@Component({
	selector: 'app-profile-specialist',
	templateUrl: './profile-specialist.component.html',
	styleUrls: ['./profile-specialist.component.scss']
})
export class ProfileSpecialistComponent implements OnInit {

    public profile: SpecialistProfile;
    public activeSessions: SpecialistProfileActiveSession[];

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

    getPhone(phoneStr: string) {
		return StringHelper.formatPhone(phoneStr);
    }
    
    normalizeMonth(monthStr: string) {
        return monthStr.replace(".", "");
    }

    routeToImages(problem: Problem) {
        this.router.navigate([`/profile-specialist/clients/${problem.user.id}/problems/${problem.id}/assets`], {
            queryParams: {
                tab: 'images'
            }
        });
    }

    routeToResources(problem: Problem) {
        this.router.navigate([`/profile-specialist/clients/${problem.user.id}/problems/${problem.id}/assets`], {
            queryParams: {
                tab: 'resources'
            }
        });
    }

    getAvatar() {
		return StringHelper.getFirstLetter(this.profile.lastName);
    }
    
    uploadFile(files: FileList) {
        const file = files.item(0);

        this.specialistService.uploadAvatarImage(file)
            .subscribe(response => this.profile.photoUrl = response.url);
    }
}