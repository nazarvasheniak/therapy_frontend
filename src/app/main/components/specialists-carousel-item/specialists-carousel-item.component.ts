import { Component, AfterViewInit, Input, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { UserRole } from 'src/app/common/enums';
import { LocalStorageHelper } from 'src/app/common/helpers';
import { Specialist, Review } from 'src/app/common/models';
import { AuthService, SpecialistsService, StorageService, UsersService } from 'src/app/common/services';

@Component({
    selector: 'specialists-carousel-item',
	templateUrl: './specialists-carousel-item.component.html',
	styleUrls: ['./specialists-carousel-item.component.scss']
})
export class SpecialistsCarouselItemComponent implements OnInit {

    public isLoggedIn = false;
    public isSpecialist = false;

    @Input('specialist') specialist: Specialist;

    public positiveReviews: Review[];
    public neutralReviews: Review[];
    public negativeReviews: Review[];

    constructor(
        private storageService: StorageService,
        private authService: AuthService,
        private usersService: UsersService,
        private router: Router
    ) {
        this.authService.isLoggedIn
            .subscribe(logged => {
                if(logged) {
                    this.isLoggedIn = logged;

                    this.usersService.getUserInfo()
                        .subscribe(user => {
                            if (user.role == UserRole.Specialist) {
                                this.isSpecialist = true;

                                return;
                            }

                            this.isSpecialist = false;
                        });
                }
            });
    }

    ngOnInit() {
        this.loadReviews();
    }

    private loadReviews() {
        this.positiveReviews = this.specialist.reviews.filter(x => x.score >= 4);
        this.neutralReviews = this.specialist.reviews.filter(x => x.score == 3);
        this.negativeReviews = this.specialist.reviews.filter(x => x.score < 3);
    }

    showSpecialistDialog(specialist: Specialist) {
        if (!this.isLoggedIn) {
            LocalStorageHelper.saveSpecialist(specialist);

            this.router.navigate(['/sign-up']);

            return;
        }

        let dialog = document.querySelector('.choose-specialist-dialog');

        dialog.classList.remove('hidden');
        dialog.classList.add('show');
        
        this.storageService.setSpecialist(specialist);
    }
}
